import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErrorMessageComponent } from './page-error-message.component';

describe('PageErrorMessageComponent', () => {
  let component: PageErrorMessageComponent;
  let fixture: ComponentFixture<PageErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
