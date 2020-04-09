import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Story } from '../models/hacker-news-model';


@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {

  id: number;

  constructor(private http: HttpClient) { }

  top_stories_url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
  individual_story_url = `https://hacker-news.firebaseio.com/v0/item/${this.id}.json?print=pretty`

  getTopStories(){
    return this.http.get(this.top_stories_url);
  }
  getIndividualStory(){
    return this.http.get<Story>(this.individual_story_url);
  }
}
