import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, forkJoin, throwError, zip} from 'rxjs';
import {YoutubeService} from './youtube.service';
import {VideoPersonalizedAttributes, VideoDetails, VideoSummery} from '../shared/models/videos';
import {emitToDataHolderSubject} from '../shared/pipes';
import {catchError, map} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {VideosPersonalAttrService} from './videos-personal-attr.service';
import {DataHolder} from '../shared/models/data-holder';
import {BaseError, ChannelFailedToLoadError, VideoFailedToLoadError} from '../shared/models/errors';


const DEFAULT_CHANNEL_USERNAME = 'LinusTechTips';
const DEFAULT_MAX_RESULTS = 50;

const SAVED_CHANNELS_VIDEOS_KEY = 'saved_channels_videos';


@Injectable({
  providedIn: 'root'
})
export class VideosService {

  /**
   * Subject to hold videos summery list of a channel
   */
  private _videosSummery$ = new BehaviorSubject<DataHolder<VideoSummery[]>>(null);
  /**
   * subject to pass the search input value between header and home component
   */
  private _videosTitleSearch$ = new BehaviorSubject<string>(null);

  currentChannelUsernameOrId = DEFAULT_CHANNEL_USERNAME;

  constructor(private youtubeService: YoutubeService, private localStorageService: LocalStorageService,
              private videosAttr:VideosPersonalAttrService) {
  }

  saveVideoAttributes(video: VideoDetails) {
    const newVideoAttributes = new VideoPersonalizedAttributes(video);
    return this.videosAttr.setSavedVideosAttr(video.id,newVideoAttributes,);
  }

  getVideoDetails(videoId: string) {
    return combineLatest(this.youtubeService.fetchVideoDetails(videoId),
      this.videosAttr.getSavedVideoAttr(videoId))
      .pipe(map(([videoDetails, videoAttributes]) =>  {
       return {...videoDetails,...videoAttributes}
      }),catchError((err) => {
        if (!(err instanceof BaseError)) { // If the error is not a custom declared Error throw a general Error
         return  throwError(new VideoFailedToLoadError());
        }
        return throwError(err);
      }));
  }

  retrieveChannelUploadedVideosList(channelUsernameOrId?:string, maxResults?: number) {
    this.videosSummery.next(null); // clear the subject from it's value and it's also a condition to show loading
    if(channelUsernameOrId) this.currentChannelUsernameOrId = channelUsernameOrId.trim();
    maxResults = maxResults || DEFAULT_MAX_RESULTS;
    const savedChannelsVideos = this.localStorageService.getObject(SAVED_CHANNELS_VIDEOS_KEY);
    if (savedChannelsVideos) { // checks if the channel videos already saved in LocalStorage
      const videos: VideoSummery[] = savedChannelsVideos[this.currentChannelUsernameOrId];
      if (videos) {
        this._videosSummery$.next(DataHolder.from(videos));
      } else {
        this.fetchVideosFromServer(this.currentChannelUsernameOrId, maxResults);
      } // if not retrieve a fresh list from the API
    }else{
      this.fetchVideosFromServer(this.currentChannelUsernameOrId, maxResults);
    }
    return this.videosSummery;
  }

  private fetchVideosFromServer(channelUsernameOrId?: string, maxResults?: number) {
    return this.youtubeService.fetchVideosOfChannel(channelUsernameOrId, maxResults)
      .pipe(emitToDataHolderSubject(this._videosSummery$,() => new ChannelFailedToLoadError()))
      .subscribe(resp => {
        if(!resp.error)
        this.localStorageService.updateObject(SAVED_CHANNELS_VIDEOS_KEY, {[channelUsernameOrId]:resp.data})
      });
  }


  searchByVideoTitle(title: string) {
    this._videosTitleSearch$.next(title);
  }


  get videosTitleSearch() {
    return this._videosTitleSearch$;
  }

  get videosSummery() {
    return this._videosSummery$;
  }

}
