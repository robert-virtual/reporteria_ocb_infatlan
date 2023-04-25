import {Injectable, Query} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BasicResponse, User} from "../login/login.service";

export interface ITable {
  name: string
}

export interface IAction {
  name: string
}

export interface IQuery {
  table: ITable,
  action: IAction,
  parameters: string
  whereCondition: string
  status: string
  response: string
  requestedBy: User
  requestedAt: string
  authorizedBy: User
  authorizedAt: string
}

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  constructor(private http: HttpClient) {
  }

  firstKey(e: {}) {
    return Object.keys(e).at(0)
  }

  getQueries(query?: any[]) {
    let queryString = !query ? "" : query.map(e => `${this.firstKey(e)}=${e[this.firstKey(e)!]}`).join("&")
    return this.http.get<BasicResponse<IQuery[]>>(`${environment.apiUrl}/queries/all?${queryString}`)
  }
}
