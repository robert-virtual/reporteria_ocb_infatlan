import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {LoginService} from "./login/login.service";
import {Page1Component} from "./page1/page1.component";
import {Page2Component} from "./page2/page2.component";


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
        redirectTo:"page1"
      },
      {
        path: "page1",
        component: Page1Component,
      },
      {
        path: "page2",
        component: Page2Component,
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
