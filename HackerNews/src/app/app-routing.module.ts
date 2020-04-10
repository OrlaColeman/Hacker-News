import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './home/homepage/homepage.component';
import { LandingComponent } from './home/landing/landing.component';

const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path: 'landing', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
