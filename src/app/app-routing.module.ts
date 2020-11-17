import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './view/login/login.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ProfileComponent } from './view/profile/profile.component';
import { CreatepostComponent } from './view/createpost/createpost.component';
import { CompanyComponent } from './view/company/company.component';
import { ViewpostComponent } from './view/viewpost/viewpost.component';
import { ViewuserComponent } from './view/viewuser/viewuser.component';
import { StatisticsComponent } from './view/statistics/statistics.component';

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
      {
        path: "createpost",
        canActivate: [AuthGuard],
        component: CreatepostComponent,
      },
      {
        path: "company",
        canActivate: [AuthGuard],
        component: CompanyComponent,
      },
      {
        path: "viewpost",
        canActivate: [AuthGuard],
        component: ViewpostComponent,
      },
      {
        path: "viewuser",
        canActivate: [AuthGuard],
        component: ViewuserComponent,
      },
      {
        path: "statistics",
        canActivate: [AuthGuard],
        component: StatisticsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
