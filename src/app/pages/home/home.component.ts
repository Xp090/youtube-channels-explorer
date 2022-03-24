import {Component, OnInit, ViewChild} from '@angular/core';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {VideoSummery} from '../../shared/models/videos';
import {VideosService} from '../../services/videos.service';
import {animateChild, query, transition, trigger} from '@angular/animations';
import {fadeInOut} from '../../shared/animations';
import {DataHolder} from '../../shared/models/data-holder';
import {PageErrorMessageComponent} from '../../components/page-error-message/page-error-message.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    //Duo to a bug in AngularAnimations, The Table rows disappear during page transition animation in AppComponent
    //And this a workaround to keep it visible
    trigger('tableRowAnimationFix', [
      transition('* => void', [
        query('@*', [animateChild()], {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  isError: boolean = false;

  displayedColumns = ['thumbnail', 'title', 'publishDate', 'details'];

  videosDataSource: MatTableDataSource<VideoSummery>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(PageErrorMessageComponent) pageErrorMessage:PageErrorMessageComponent;

  constructor(private videosService: VideosService) {

  }

  ngOnInit() {
    this.retrieveChannelUploadedVideosList();
    this.videosService.videosTitleSearch
      .subscribe(searchTitle => this.searchByTitle(searchTitle));

  }


  retrieveChannelUploadedVideosList() {
    this.videosService.retrieveChannelUploadedVideosList()
      .subscribe(value => {
        if (value) {
          if (value.error) { // if the DataHolder contains an error show it
            this.isError = true;
            this.pageErrorMessage.showError(value.error);
            return;
          }
          this.isError = false;
          this.videosDataSource = new MatTableDataSource(value.data);
          this.videosDataSource.paginator = this.paginator;
          this.videosDataSource.sort = this.sort;
        } else {
          // if value is null it means the subject value is clear and about to receive a new one
          // and loading should be shown
          this.videosDataSource = null;
        }
      });

  }

  searchByTitle(searchTitle: string) {
    if (searchTitle != null) {
      this.videosDataSource.filter = searchTitle.trim().toLowerCase();
      if (this.videosDataSource.paginator) {
        this.videosDataSource.paginator.firstPage();
      }
    }
  }

  onRetry() {
    this.isError = false;
    this.retrieveChannelUploadedVideosList()
  }
}
