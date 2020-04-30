import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navigation/navbar/navbar.component';
import { NavigationModule } from '../navigation/navigation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import { TesterComponent } from './tester/tester.component';

@NgModule({
  declarations: [HomepageComponent, LandingComponent, TesterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavigationModule  
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomeModule { }
