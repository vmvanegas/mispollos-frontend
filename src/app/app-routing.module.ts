import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path:'registro', component: SignupComponent},
  { path:'login', component: LoginComponent},
  {
    path: 'administracion',
    loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule),
    canActivate: [AuthGuard]
  },
  { path:'', pathMatch:'full', redirectTo: 'registro'},
  { path:'**', redirectTo: 'registro'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
