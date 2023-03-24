import {Injectable} from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError,Observable, of } from "rxjs";
import {map} from 'rxjs/operators'
import {Router} from "@angular/router";

export interface BasicResponse<T> {
  data?: T
  error?: string
  data_count: number
}

export interface LoginResponse {
  token: string
}

export interface LoginBody {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient,private router:Router) {
  }

  login(loginRequest: LoginBody) {
    return this.http.post<BasicResponse<LoginResponse>>(`${environment.apiUrl}/auth/login`, loginRequest)
  }

  private handleError<T>(operation='operation',result?:T){
    return (error:any):Observable<T>=>{
      console.error("login service: ",error)
      sessionStorage.removeItem("token")
      this.router.navigate(["login"])
      return of(result as T)
    }
  }
  canActivate() {
    return this.http.get(`${environment.apiUrl}/auth/check-token`).pipe(
      catchError(this.handleError('check-token',false))
    )
  }

  getAuthToken() {
    return sessionStorage.getItem("token")
  }
}
