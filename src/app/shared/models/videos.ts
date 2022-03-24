import * as moment from 'moment';


export class VideoSummery {
  id:string;
  thumbnail:string;
  title:string;
  publishDate:Date;

  constructor(videoSummeryResponse?: any) {
    if (videoSummeryResponse) {
      this.id = videoSummeryResponse.snippet.resourceId.videoId;
      this.thumbnail= videoSummeryResponse.snippet.thumbnails.medium.url;
      this.title = videoSummeryResponse.snippet.title;
      this.publishDate = new Date(videoSummeryResponse.snippet.publishedAt)
    }
  }
}

export class VideoDetails extends VideoSummery{
  description:string;
  duration:string;
  views:string;
  likes:string;
  isFavorite:boolean = false;
  rating:number = 0;

  constructor(videoDetailsResponse: any) {
    super();
    this.id = videoDetailsResponse.id;
    const thumbnails = videoDetailsResponse.snippet.thumbnails;
    if (thumbnails.maxres) {
      this.thumbnail = thumbnails.maxres.url;
    } else {
      this.thumbnail = thumbnails.medium.url;
    }
    this.title = videoDetailsResponse.snippet.title;
    this.publishDate = new Date(videoDetailsResponse.snippet.publishedAt);
    this.description = videoDetailsResponse.snippet.description;
    this.duration = moment.duration(videoDetailsResponse.contentDetails.duration).format("h:mm:ss");
    this.views = videoDetailsResponse.statistics.viewCount;
    this.likes = videoDetailsResponse.statistics.likeCount;
  }

}

export class VideoPersonalizedAttributes {
  isFavorite:boolean = false;
  rating:number = 0;

  constructor(video?:VideoDetails){
    this.isFavorite = video.isFavorite;
    this.rating = video.rating;
  }

}
