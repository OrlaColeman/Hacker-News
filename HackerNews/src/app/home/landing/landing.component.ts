import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  currentLandingState = 'initial'

  constructor(private router: Router) { }

  ngOnInit() {
  }


}
