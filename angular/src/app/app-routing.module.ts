import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';




const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'details/:id', component: DetailComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', redirectTo: '/home'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
