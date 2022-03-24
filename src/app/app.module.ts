import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialComponentsModule} from './angular-material-components.module';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule} from '@angular/forms';
import { VideoDetailsComponent } from './pages/video-details/video-details.component';
import 'moment-duration-format';
import {BarRatingModule} from 'ngx-bar-rating';
import {ContentLoaderModule} from '@netbasal/ngx-content-loader';
import { PageErrorMessageComponent } from './components/page-error-message/page-error-message.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    VideoDetailsComponent,
    PageErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialComponentsModule,
    FormsModule,
    BarRatingModule,
    ContentLoaderModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
