import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {VideoDetails, VideoSummery} from '../shared/models/videos';
import {DataHolder} from '../shared/models/data-holder';
import {ChannelNotFoundError, VideoNotFoundError} from '../shared/models/errors';
import {environment} from '../../environments/environment';





@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) {
  }

  fetchVideoDetails(videoId: string) {
    const videoDetailsUrl = `${YoutubeService.videoDetailsApiUrl}part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
    return this.http.get(videoDetailsUrl)
      .pipe(map<any,VideoDetails>(response => { //Map the response to VideoDetails object
        try {
         return  new VideoDetails(response.items[0])
        }catch (e) {
          throw new VideoNotFoundError()
        }
      } ))
  }

  fetchVideosOfChannel(channelUsernameOrId: string, maxResults: number): Observable<DataHolder<VideoSummery[]>> {
    return this.getChannelDetails(channelUsernameOrId) // First we retrieve the channel details
      .pipe(switchMap<any, Array<any>>(channelResponse => {
        try {
          //Then we get the uploads playlist from the channel details and then get the playlist videos
          return this.getMostRecentUploadsForPlaylist(channelResponse.items[0].contentDetails.relatedPlaylists.uploads,maxResults);
        }catch (e) {
          return throwError(new ChannelNotFoundError())
        }
      }), map<any, DataHolder<VideoSummery[]>>(videosResponse =>{ // map response to VideoSummery object
        return DataHolder.from(videosResponse.items.map(videoResponse => new VideoSummery(videoResponse)))
      }));
  }

  getChannelDetails(channelUsernameOrId: string){
    let channelDetailsUrl = `${YoutubeService.channelsApiUrl}part=contentDetails&`;
    if (YoutubeService.isChannelId(channelUsernameOrId)) {
      channelDetailsUrl += `id=${channelUsernameOrId}`;
    } else {
      channelDetailsUrl += `forUsername=${channelUsernameOrId}`;
    }

    return this.http.get(channelDetailsUrl);
  }

  getMostRecentUploadsForPlaylist(playlistId: string, maxResults: number) {
    let videosOfChannelUrl = `${YoutubeService.playlistItemsApiUrl}part=snippet&maxResults=${maxResults}&playlistId=${playlistId}`;
    return this.http.get<Array<any>>(videosOfChannelUrl);
  }


  private static get videoDetailsApiUrl():string{
    return YoutubeService.getApiUrlWithKey(`videos`);
  }

  private static get playlistItemsApiUrl(): string {
    return YoutubeService.getApiUrlWithKey(`playlistItems`);
  }

  private static get channelsApiUrl(): string {
    return YoutubeService.getApiUrlWithKey(`channels`);
  }

  private static getApiUrlWithKey(apiType: string): string {
    return `${environment.GOOGLE_API_BASE_URL}/${apiType}?key=${environment.GOOGLE_API_KEY}&`;
  }

  /**
   * Check if the provided input is a channel username or channelId
   * (Note: This is not an official way and can lead to a false-positives
   * if a channel username starts with "UC" and it's length is 24)
   */
  private static isChannelId(channelUsernameOrId:string) :boolean {
    return channelUsernameOrId.startsWith("UC") && channelUsernameOrId.length == 24 ;
  }
}
