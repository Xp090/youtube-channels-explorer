import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {VideoDetailsComponent} from './pages/video-details/video-details.component';

const routes: Routes = [
  { path: 'videoDetails/:id', component: VideoDetailsComponent ,data:{animation: 'DetailsPage'}  },
  { path: '', component: HomeComponent , pathMatch: 'full' ,data:{animation: 'HomePage'}},
  { path: '**', redirectTo: '', pathMatch: 'full'  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
