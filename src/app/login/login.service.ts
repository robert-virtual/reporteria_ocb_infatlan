import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export interface BasicResponse<T>{
  data?:T
  error?:string
  data_count:number
}
export interface LoginResponse{
  token:string
}
export interface LoginBody {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
  }

  login(loginRequest: LoginBody) {
    return this.http.post<BasicResponse<LoginResponse>>(`${environment.apiUrl}/auth/login`, loginRequest)
  }

  canActivate() {
    return this.http.get(`${environment.apiUrl}/auth/check-token`);
  }

  getAuthToken() {
    return  sessionStorage.getItem("token")
  }
}
