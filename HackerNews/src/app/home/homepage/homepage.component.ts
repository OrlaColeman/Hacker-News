import { Component, OnInit, HostListener } from '@angular/core';
import { HackerNewsApiService } from 'src/app/services/hacker-news-api.service';
import { Story } from 'src/app/models/hacker-news-model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { trigger, style, state, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('fadeIn', [
      state('initial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('initial=>final', animate('3000ms'))
    ]),
    trigger('fadeLandingIn', [
      state('initial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('initial=>final', animate('1000ms')),
      transition('final=>initial', animate('1400ms'))
    ])
  ]
})

export class HomepageComponent implements OnInit {

  currentState = 'initial';
  currentLandingState = 'initial'

  main_story_url: SafeResourceUrl;
  id_array: any;
  even_story_array: Story[] = [];
  odd_story_array: Story[] = [];
  tagline: string;
  now: Date = new Date();
  counter: number = 20;
  windowScrolled: boolean;
  next_disabled: boolean = false;
  prev_disabled: boolean = true;


  //when called will see if user has scrolled past the top of the page - when called brings the user back to the top
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  //used for navbar to communicate with homepage
  clickEventsubscription: Subscription;

  constructor(private service: HackerNewsApiService, private shared_service: SharedServiceService, public sanitizer: DomSanitizer) {
    this.now = new Date();

    this.clickEventsubscription = this.shared_service.getTopStoryEvent().subscribe(() => {
      this.getStoryIDs();
    })

    this.clickEventsubscription = this.shared_service.getNewStoryEvent().subscribe(() => {
      this.getNewStoryIDs();
    });
  }

  ngOnInit() {

    document.getElementById('home').style.display = 'none';

    this.getStoryIDs();

    setTimeout(function () {
      this.changeLandingState();
    }.bind(this), 400);

    setTimeout(function () {
      this.changeLandingState2();
    }.bind(this), 5000);

    setTimeout(function () {
      this.changeState();
    }.bind(this), 6500);

    setTimeout(function () {
      this.display_home();
    }.bind(this), 6000);

  }


  display_home() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('landing').style.display = 'none';
  }

  //get Top story ID's and add to array to display on homepage
  getStoryIDs() {
    return this.service.getTopStoryIDs().subscribe(data => {
      this.id_array = data;
    }),
      setTimeout(
        function () {
          this.getStories(20);
        }.bind(this), 5000);
  }

  //get New story ID's and add to array to display for 'New' tab
  getNewStoryIDs() {
    return this.service.getNewStoryIDs().subscribe(data => {
      this.id_array = data;
    }),
      setTimeout(
        function () {
          this.getStories(20);
        }.bind(this), 5000);
  }

  //iterate through array of ID's to get each story's data and add to story array's to display on page
  getStories(num: number) {
    this.even_story_array.length = 0;
    this.odd_story_array.length = 0;

    this.service.getIndividualStory(this.id_array[0]).subscribe(data => {
      this.even_story_array.push(data);
      this.tagline = (this.even_story_array[0].score + " points by " + this.even_story_array[0].by);
      //using iframe to display linked page
      this.main_story_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.even_story_array[0].url);
    });

    //splitting array into odd and even to display in two columns
    for (let i = (num - 19); i < num; i += 2) {
      this.service.getIndividualStory(this.id_array[(i + 2)]).subscribe(data => {
        this.even_story_array.push(data);
      });
      this.service.getIndividualStory(this.id_array[(i + 1)]).subscribe(data => {
        this.odd_story_array.push(data);
      });
    }

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
      console.log(this.counter)
      this.prev_disabled = true;
      this.counter -= 20;
      this.getStories(this.counter);
      this.scrollToTop();
    }
    else {
      console.log(this.counter)
      this.counter -= 20;
      this.getStories(this.counter);
      this.scrollToTop();
    }

  }

  //animation functions
  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }
  changeLandingState() {
    this.currentLandingState = this.currentLandingState === 'initial' ? 'final' : 'initial';
  }
  changeLandingState2() {
    this.currentLandingState = this.currentLandingState === 'final' ? 'initial' : 'final';
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

  //function to calculate time from data
  calcEvenTime() {
    this.even_story_array.forEach(element => {
      let unixtimestamp = element.time;
      let dateNow = new Date(unixtimestamp * 1000);

      console.log((this.now.getHours() - dateNow.getHours()) + " hours");
    })
  }
}
