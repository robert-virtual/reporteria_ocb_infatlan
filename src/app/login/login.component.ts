import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginBody, LoginService} from "./login.service";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  snackBar(message: string, action?: string) {
    this._snackBar.open(message, action)
  }

  loginForm = this.fb.group({
    password: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]]
  })
  hidePass = true

  get email() {
    return this.loginForm.get('email')!
  }

  get password() {
    return this.loginForm.get('password')!
  }

  login() {
    console.log("request send")
    this.loginService.login(this.loginForm.value as LoginBody).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status >= 400 && err.status < 500) {
        this.snackBar("Bad Credentials")

      }
      if (err.status >= 500) {
        this.snackBar("Internal Server Error")

      }
      return throwError(() => err)
    })).subscribe(({data, error}) => {
      if (data) {
        sessionStorage.setItem("token", data.token)
        this.router.navigate(["home"])
      }
    })
  }
}
