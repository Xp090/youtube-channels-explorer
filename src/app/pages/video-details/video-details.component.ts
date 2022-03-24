import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {MatSnackBar} from '@angular/material';
import {VideosService} from '../../services/videos.service';
import {VideoDetails} from '../../shared/models/videos';
import {fadeInOut} from '../../shared/animations';
import {DataHolder} from '../../shared/models/data-holder';
import {PageErrorMessageComponent} from '../../components/page-error-message/page-error-message.component';
@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
  animations:[
    fadeInOut
  ]
})
export class VideoDetailsComponent implements OnInit {

  videoDetails:VideoDetails ;
  isError: boolean = false;
  isUpdatingVideoAttributes: boolean = false;
  videoId:string;

  @ViewChild(PageErrorMessageComponent) pageErrorMessage:PageErrorMessageComponent;

  constructor(private route:ActivatedRoute,private videosService:VideosService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.videoId = params['id'];
      this.getVideoDetails();
    })
  }

  getVideoDetails() {
    this.videosService.getVideoDetails(this.videoId)
      .subscribe(video => this.videoDetails = video,
      err => {
        this.isError = true;
        this.pageErrorMessage.showError(err);
      });
  }

  onToggleFavorites(videoDetails: VideoDetails) {
    videoDetails.isFavorite = !videoDetails.isFavorite; //Toggle favorite value and button
    this.isUpdatingVideoAttributes = true; // Show loading progressbar
    this.videosService.saveVideoAttributes(videoDetails)
      .then(() => this.isUpdatingVideoAttributes = false)  // hide loading progressbar
      .catch(() => {
        this.isUpdatingVideoAttributes = false; // Hide loading progressbar
        videoDetails.isFavorite = !videoDetails.isFavorite; // revert back the favorite value and button
       const snackBar =  this.snackBar.open("Unable to update favorites list", "Retry", {
          duration: 5000,
        });
       //Call again when user click retry
       snackBar.onAction().subscribe(()=> this.onToggleFavorites(videoDetails))
      })
  }

  onRatingUpdate(videoDetails: VideoDetails) {
    this.isUpdatingVideoAttributes = true; // Show loading progressbar
    this.videosService.saveVideoAttributes(videoDetails)
      .then(() => this.isUpdatingVideoAttributes = false)
      .catch(() => {
        this.isUpdatingVideoAttributes = false; // Hide loading progressbar
        const snackBar =  this.snackBar.open("Unable to update your rating", "Retry", {
          duration: 5000,
        });
        //Call again when user click retry
        snackBar.onAction().subscribe(()=> this.onRatingUpdate(videoDetails))
      })
  }

  onRetry() {
    this.isError = false;
    this.getVideoDetails()
  }
}
