import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, flatMap, map, switchAll} from 'rxjs/operators';
import {VideosService} from '../../services/videos.service';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {fadeInOut} from '../../shared/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class HeaderComponent implements OnInit,AfterViewInit {

  channelUsernameOrId:string;
  private _searchInput: ElementRef;

  @ViewChild('searchInput') set searchInput(element :ElementRef) {
    this._searchInput = element;
    if (element) {
      fromEvent(element.nativeElement, 'keyup').pipe( //Create observable form KeyUp event on the search input
        map((e: any) => e.target.value),
        debounceTime(500)) // Wait 500ms after last keystroke then emit the search value
        .subscribe(value => this.videosService.searchByVideoTitle(value) ) ;
    }
  }

  constructor(private videosService:VideosService,public router: Router) { }

  ngOnInit() {
  this.channelUsernameOrId = this.videosService.currentChannelUsernameOrId;

  }

  ngAfterViewInit(): void {

  }

  onRetrieveChannelVideosFromUsernameOrId() {
    this.resetSearch();
    this.videosService.retrieveChannelUploadedVideosList(this.channelUsernameOrId);
  }

  private resetSearch() {
    this._searchInput.nativeElement.value = "";
    this.videosService.searchByVideoTitle("")
  }
}
