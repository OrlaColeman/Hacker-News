import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from 'src/app/services/hacker-news-api.service';
import { Story } from 'src/app/models/hacker-news-model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  id_array: any;

  stories_array: Story[] = [];
  comments_array: number[] = [];

  constructor(private service: HackerNewsApiService) { }

  ngOnInit() {
  }

  getStoryIDs(){
    return this.service.getTopStoryIDs().subscribe( data => {
      this.id_array = data;
      this.getStories();
    });
  }

  getStories(){
    //itterate through array of ID's & for each one make GET request for story data, then add each one to an array
    this.id_array.forEach(id => {
      this.service.getIndividualStory(id).subscribe( data => {
        this.stories_array.push(data);
       });
    });
  }

}
