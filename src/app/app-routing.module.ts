import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { CanEnterGuard } from './services/can-enter.guard';


const routes: Routes = [
  { path:'registro', component: SignupComponent},
  { path:'recuperar-clave/:token', component: RecoverPasswordComponent},
  { path:'clave-olvidada', component: ForgottenPasswordComponent},
  { path:'login', component: LoginComponent, canActivate: [CanEnterGuard]},
  {
    path: 'administracion',
    loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule),
    canActivate: [AuthGuard]
  },
  { path:'', pathMatch:'full', redirectTo: 'login'},
  { path:'**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
