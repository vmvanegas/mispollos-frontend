import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path:'registro', component: SignupComponent},
  { path:'', pathMatch:'full', redirectTo: 'registro'},
  { path:'**', redirectTo: 'registro'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
