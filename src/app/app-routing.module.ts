

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CustomPreloadingService} from './custom-preloading.service';
import { AuthGuard } from './core/auth.guard';
import { UserGuard } from './core/user.guard';

const routes: Routes = [
  { path: 'home',  component: HomeComponent, canActivate: [AuthGuard]},
  // Lazy load all the employeModule
  { path: 'employees',  loadChildren: './employee-module/employee.module#EmployeeModule', canActivate: [AuthGuard]},
  { path: 'auth',  loadChildren: './core/core.module#CoreModule', canActivate: [UserGuard]},
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: '**',  component: PageNotFoundComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
