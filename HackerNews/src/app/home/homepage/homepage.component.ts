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
  even_story_array: Story[]=[];
  odd_story_array: Story[]=[];

  tagline: string;

  now: Date = new Date();

  constructor(private service: HackerNewsApiService) { 
    this.now = new Date();
  }

  ngOnInit() {
    this.getStoryIDs();

    setTimeout(
      function(){
        this.getStories();
      }.bind(this), 2000);

  }

  getStoryIDs(){
    return this.service.getTopStoryIDs().subscribe( data => {
      this.id_array = data;
      console.log(this.id_array)
      console.log("done")
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

  calcTime(){
    //calc time from time given through API call 
    this.stories_array.forEach( element => {
      let unixtimestamp = element.time;
      let dateNow = new Date(unixtimestamp*1000);
      console.log(((this.now.getHours()) - dateNow.getHours()));
    })

  }

  splitArrays(){
    for( let i=1; i<this.stories_array.length; i++){
      console.log(i);
    }
  }

}
