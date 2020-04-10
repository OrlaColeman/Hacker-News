import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from 'src/app/services/hacker-news-api.service';
import { Story } from 'src/app/models/hacker-news-model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  safeUrl: SafeResourceUrl;
  evenUrl: SafeResourceUrl;
  oddUrl: SafeResourceUrl;

  id_array: any;

  even_story_array: Story[] = [];
  odd_story_array: Story[] = [];

  tagline: string;

  now: Date = new Date();

  constructor(private service: HackerNewsApiService, public sanitizer: DomSanitizer) {
    this.now = new Date();
  }

  ngOnInit() {
    this.getStoryIDs();

    setTimeout(
      function () {
        this.getStories(50);
      }.bind(this), 5000);

  }

  getStoryIDs() {
    return this.service.getTopStoryIDs().subscribe(data => {
      this.id_array = data;
    });

  }

  calcEvenTime(){
    this.even_story_array.forEach( element => {
      let unixtimestamp = element.time;
      let dateNow = new Date(unixtimestamp * 1000);

      console.log( (this.now.getHours() - dateNow.getHours()) + " hours");
    })
  }


  getStories(num: number) {
    this.even_story_array.length = 0;
    this.odd_story_array.length = 0;

    this.service.getIndividualStory(this.id_array[0]).subscribe(data => {
      this.even_story_array.push(data);

      this.tagline = (this.even_story_array[0].score + " points by " + this.even_story_array[0].by);

      if (this.even_story_array[0].url == undefined) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/generic_news2.jpg');
      }
      else {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.even_story_array[0].url);
      }
    });


    for (let i = 1; i < num; i += 2) {
      this.service.getIndividualStory(this.id_array[(i + 2)]).subscribe(data => {
        this.even_story_array.push(data);
        // this.evenUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/generic_news.jpg');
      });
      this.service.getIndividualStory(this.id_array[(i + 1)]).subscribe(data => {
        this.odd_story_array.push(data);
        //   this.oddUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/generic_news2.jpg');
      });
    }

  }



}
