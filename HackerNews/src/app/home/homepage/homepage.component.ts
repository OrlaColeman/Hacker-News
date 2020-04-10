import { Component, OnInit, HostListener, Directive, Input, HostBinding } from '@angular/core';
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
  id_array: any;
  even_story_array: Story[] = [];
  odd_story_array: Story[] = [];
  tagline: string;
  now: Date = new Date();
  counter: number = 20;
  windowScrolled: boolean;
  next_disabled: boolean = false;
  prev_disabled: boolean = true;


  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  constructor(private service: HackerNewsApiService, public sanitizer: DomSanitizer) {
    this.now = new Date();
  }

  ngOnInit() {
    this.getStoryIDs();

    setTimeout(
      function () {
        this.getStories(20);
      }.bind(this), 5000);

  }


  myLoadEvent(e) {
    console.log(e);
  }

  getStoryIDs() {
    return this.service.getTopStoryIDs().subscribe(data => {
      this.id_array = data;
    });

  }

  getStories(num: number) {
    this.even_story_array.length = 0;
    this.odd_story_array.length = 0;

    this.service.getIndividualStory(this.id_array[0]).subscribe(data => {
      this.even_story_array.push(data);
      this.tagline = (this.even_story_array[0].score + " points by " + this.even_story_array[0].by);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.even_story_array[0].url);
    });

    for (let i = (num - 19); i < num; i += 2) {
      this.service.getIndividualStory(this.id_array[(i + 2)]).subscribe(data => {
        this.even_story_array.push(data);
      });
      this.service.getIndividualStory(this.id_array[(i + 1)]).subscribe(data => {
        this.odd_story_array.push(data);
      });
    }

  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  calcEvenTime() {
    this.even_story_array.forEach(element => {
      let unixtimestamp = element.time;
      let dateNow = new Date(unixtimestamp * 1000);

      console.log((this.now.getHours() - dateNow.getHours()) + " hours");
    })
  }

  next() {
    this.prev_disabled = false;

    if (this.counter == 240) {
      this.next_disabled = true;
      this.counter += 20;
      this.getStories(this.counter);
      this.scrollToTop();
    }
    else {
      this.counter += 20;
      this.getStories(this.counter);
      this.scrollToTop();
    }

  }
  prev() {
    this.next_disabled = false;

    if (this.counter == 40) {
      this.prev_disabled = true;
      this.counter -= 20;
      this.getStories(this.counter);
      this.scrollToTop();
    }
    else {
      this.counter -= 20;
      this.getStories(this.counter);
      this.scrollToTop();
    }

  }
}
