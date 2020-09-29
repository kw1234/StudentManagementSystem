import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  constructor(public auth: AuthService) {}

  loginData = {
    email: '',
    password: '',
  };

  login() {
    this.auth.login(this.loginData);
  }
}
