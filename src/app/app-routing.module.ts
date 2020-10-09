import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './view/login/login.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ProfileComponent } from './view/profile/profile.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: "",
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },
      {
        path: "dashboard",
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },
      {
        path: "profile",
        canActivate: [AuthGuard],
        component: ProfileComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
