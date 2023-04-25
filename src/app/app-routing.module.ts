import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {LoginService} from "./login/login.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {QueriesComponent} from "./queries/queries.component";


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [() => inject(LoginService).canActivate()],
    children: [
      {
        path: "",
        pathMatch:'full',
        redirectTo:"dashboard"
      },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "queries",
        component: QueriesComponent,
      }
    ]
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: sessionStorage.getItem("token") != null ? "/home" : "/login"
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
