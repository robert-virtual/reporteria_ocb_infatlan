import { Component } from '@angular/core';
import {LoginService, Module, User} from "../login/login.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user:User
  modules: Module[] = [] as Module[]
  constructor(private loginService:LoginService) {
    this.user = loginService.user
    this.modules = this.user.roles.flatMap(e => e.modules)
  }
}
