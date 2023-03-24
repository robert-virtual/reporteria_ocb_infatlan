import {Component} from '@angular/core';
import {FormBuilder,  Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb:FormBuilder) {
  }
  loginForm = this.fb.group({
    password : ['', [Validators.required]],
    email : ['', [Validators.email, Validators.required]]
  })
  hidePass = true
  get email(){
    return this.loginForm.get('email')!
  }
  get password(){
    return this.loginForm.get('password')!
  }
  login() {
    console.log(this.loginForm.value)
  }
}
