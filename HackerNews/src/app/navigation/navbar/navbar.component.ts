import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private sharedService: SharedServiceService) { }

  ngOnInit() {
  }

  getTopStories(){
    this.sharedService.sendTopStoryEvent();
  }

  getNewStories(){
this.sharedService.sendNewStoryEvent();
  }
  

}
