import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BasicResponse, LoginService} from "../login/login.service";
import {ITable} from "./queries.service";

@Injectable({
  providedIn: 'root'
})
export class AppsService {

  constructor(
    private http:HttpClient,
    private loginService:LoginService
  ) { }
  getTables(){
    return this.http.get<BasicResponse<ITable[]>>(`${environment.apiUrl}/tables/${this.loginService.currentApp?.id}`)
  }
}
