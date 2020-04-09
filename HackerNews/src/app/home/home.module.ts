import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomeModule { }
