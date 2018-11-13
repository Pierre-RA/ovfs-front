import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
  path: '',
  loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
  canActivateChild: [AuthGuard]
}, {
  path: 'sign-in',
  loadChildren: './pages/sign-in/sign-in.module#SignInModule'
}, {
  path: 'sign-up',
  loadChildren: './pages/sign-up/sign-up.module#SignUpModule'
}, {
  path: '**',
  redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
