import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './home/homepage/homepage.component';
import { LandingComponent } from './home/landing/landing.component';
import { TesterComponent } from './home/tester/tester.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
