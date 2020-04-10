import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//service to allow navbar to communicate with homepage and call functions
export class SharedServiceService {
  
  private newStories = new Subject<any>();
  private topStories = new Subject<any>();

  constructor() { }

  sendTopStoryEvent() {
    this.topStories.next();
  }
  getTopStoryEvent(): Observable<any> {
    return this.topStories.asObservable();
  }

  sendNewStoryEvent() {
    this.newStories.next();
  }
  getNewStoryEvent(): Observable<any> {
    return this.newStories.asObservable();
  }

}