import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavigationModule { }
