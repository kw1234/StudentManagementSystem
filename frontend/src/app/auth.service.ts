import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:8080/auth';
  NAME_KEY = 'name';
  EMAIL_KEY = 'email';
  TOKEN_KEY = 'token';

  // added a router to the constructor to do a redirect once someone is authenticated
  constructor(private http: Http, private router: Router) {}

  setName(name) {
    localStorage.setItem(this.NAME_KEY, name);
  }

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get email() {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader() {
    var header = new Headers({
      Authorization: 'Bearer ' + localStorage.getItem(this.TOKEN_KEY),
    });
    return new RequestOptions({ headers: header });
  }

  login(loginData) {
    this.http.post(this.BASE_URL + '/login', loginData).subscribe((res) => {
      console.log(loginData.email);
      this.authenticate(res, loginData.email);
    });
  }

  register(user) {
    // dont want to send the confirmPassword to the backend since it is only necess to handle it on frontend
    delete user.confirmPassword;
    this.http.post(this.BASE_URL + '/register', user).subscribe((res) => {
      this.authenticate(res, user.email);
    });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
    window.location.replace('/');
  }

  authenticate(res, email) {
    console.log(res);
    console.log(email);
    // adding authentication code to redirect the route to home page if authentication is successful
    var authResponse = res.json();

    if (!authResponse.token) return;
    console.log(authResponse);
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.NAME_KEY, authResponse.firstName);
    localStorage.setItem(this.EMAIL_KEY, email);
    // navigating to the home page given authentication is successful
    this.router.navigate(['/']);
  }
}
