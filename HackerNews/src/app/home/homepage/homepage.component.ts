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

  tagline: string;

  now: Date = new Date();

  constructor(private service: HackerNewsApiService) { 
    this.now = new Date();
  }

  ngOnInit() {
    console.log(this.now.getHours());
    this.getStoryIDs();
   this.tagline = this.stories_array[0].score + " points by " + this.stories_array[0].by + " "
  }

  calcTime(){
    let unixtimestamp = this.stories_array[9].time;
    const dateNow = new Date(unixtimestamp*1000);
    console.log(this.stories_array[9].title)
    console.log( ((this.now.getHours()-1) - dateNow.getHours()) );

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
        this.stories_array.forEach( a => {
          let unixtimestamp = a.time;
          const dateNow = new Date(unixtimestamp*1000);
          a.time = ((this.now.getHours()-1) - dateNow.getHours());
        })
       });
    });
  }

}
