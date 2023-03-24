import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: LoginService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.auth.getAuthToken()

    const authReq = authToken ? request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      }
    ) : request
    return next.handle(authReq);
  }
}
