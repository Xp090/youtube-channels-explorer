import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getObject<T>(key:string):T{
    return  JSON.parse(localStorage.getItem(key)) as T
  }

  saveObject<T>(key: string, object: T) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  updateObject<T>(key: string, object: T) {
    const oldObj = this.getObject(key) || {};
    const updatedObj = {...oldObj,...object};
    this.saveObject(key, updatedObj);
  }
}
