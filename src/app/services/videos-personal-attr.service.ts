import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {VideoPersonalizedAttributes} from '../shared/models/videos';

const SAVED_VIDEOS_PERSONAL_ATTRIBUTES_COLL = 'saved_videos_personal_attributes';

@Injectable({
  providedIn: 'root'
})
export class VideosPersonalAttrService {

  constructor(private fs: AngularFirestore) {

  }

  getSavedVideoAttr(videoId:string) {
    return this.savedVideosAttributesColl
      .doc<VideoPersonalizedAttributes>(videoId)
      .valueChanges();
  }

  setSavedVideosAttr(videoId:string,attr:VideoPersonalizedAttributes){
    return this.savedVideosAttributesColl
      .doc(videoId)
      .set({...attr})
  }


  //
  // // Pass a single parameter as full path
  // // Or sequence of collections and documents then combine them to a single string as full path
  // getDoc<T>(...pathSegments:string[]) {
  //  return this.fs.doc<T>(VideosPersonalAttrService.getPath(pathSegments)).valueChanges();
  // }
  //
  //
  // setDoc(obj: any, ...pathSegments: string[]) {
  //   return this.fs.doc(VideosPersonalAttrService.getPath(pathSegments)).set({...obj});
  // }
  //
  // updateDoc(obj: any, ...pathSegments: string[]) {
  //   return this.fs.doc(VideosPersonalAttrService.getPath(pathSegments)).update({...obj});
  // }


  private get savedVideosAttributesColl(){
    return this.fs.collection(SAVED_VIDEOS_PERSONAL_ATTRIBUTES_COLL)
  }

  /**
   * helper method to merge the path segments
   * @param pathSegments
   */
  // private static getPath(pathSegments: string[]) {
  //   if (pathSegments.length == 1) {
  //     return pathSegments[0]
  //   }
  //   return pathSegments.join("/");
  // }

}
