import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Story } from '../models/hacker-news-model';


@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {

  constructor(private http: HttpClient) { }

  top_stories_url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';

  getTopStoryIDs(){
    return this.http.get(this.top_stories_url);
  }
  getIndividualStory(id: number){
    return this.http.get<Story>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
  }
}
