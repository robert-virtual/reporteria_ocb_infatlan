import {Component, OnInit} from '@angular/core';
import {IApp, LoginService, Module, User} from "../login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User = {} as User
  modules: Module[] = [] as Module[]
  panelOpenState = false
  currentApp?: IApp;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.user = this.loginService.user!
    console.log(this.loginService.user)
    this.modules = this.user.roles.flatMap(e => e.modules)
    console.log(this.modules)
    this.currentApp = this.user.apps[0]
  }

  setCurrentApp(app: IApp) {
    this.loginService.setCurrentApp(app)
    this.currentApp = app
  }

  logOut() {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    this.router.navigate(["login"], {replaceUrl: true})
  }
}
