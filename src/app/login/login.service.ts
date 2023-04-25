import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, of} from "rxjs";
import {Router} from "@angular/router";

export interface BasicResponse<T> {
  data?: T
  error?: string
  data_count: number
}


export interface IScreen {
  name: string
  link: string
}

export interface Module {
  name: string
  screens: IScreen[]
}

export interface IApp {
  name: string
}

export interface Role {
  name: string
  modules: Module[]
}

export interface User {
  id: number
  name: string
  roles: Role[]
  apps: IApp[]

}

export interface LoginResponse {
  token: string
  user: User
}

export interface LoginBody {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User = JSON.parse(sessionStorage.getItem("user") || JSON.stringify({name: ""}))
  currentApp?: IApp

  constructor(private http: HttpClient, private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem("user") || "{}")
    this.currentApp = this.user.apps[0]
  }

  setCurrentApp(app: IApp) {
    this.currentApp = app;
  }

  login(loginRequest: LoginBody) {
    const useData = map((value: BasicResponse<LoginResponse>) => {
      if (value.data) {
        sessionStorage.setItem("user", JSON.stringify(value.data.user))
        sessionStorage.setItem("token", value.data.token)
        this.user = value.data.user
        this.currentApp = value.data.user.apps[0]
      }
      return value
    })
    return this.http.post<BasicResponse<LoginResponse>>(
      `${environment.apiUrl}/auth/login`,
      loginRequest
    ).pipe(useData)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("login service: ", error)
      sessionStorage.removeItem("token")
      this.router.navigate(["login"])
      return of(result as T)
    }
  }

  canActivate() {
    return this.http.get(`${environment.apiUrl}/auth/check-token`).pipe(
      catchError(this.handleError('check-token', false))
    )
  }

  getAuthToken() {
    return sessionStorage.getItem("token")
  }
}
