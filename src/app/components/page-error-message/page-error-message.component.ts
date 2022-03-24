import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'page-error-message',
  templateUrl: './page-error-message.component.html',
  styleUrls: ['./page-error-message.component.scss']
})
export class PageErrorMessageComponent implements OnInit {

  @Input() message: string; //Optional error message to show
  @Input() errorCondition:boolean; //Error condition when true show the component and hide it otherwise
  @Output() onRetry = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  retry() {
    this.onRetry.emit();
  }

  showError(error: Error | string) {
    if (error instanceof Error) {
      this.message = error.message;
    } else {
      this.message = error;
    }
    this.errorCondition = true;
  }
}
