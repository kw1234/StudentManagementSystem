import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tutorlistitem',
  templateUrl: 'tutor.list.item.component.html',
})
export class TutorListItemComponent {
  BASE_URL = 'http://localhost:8080/api';

  constructor(private http: Http, private auth: AuthService) {}

  model = { firstName: '', lastName: '', email: '' };

  ngOnInit() {
    this.getUser().subscribe((res) => {
      this.model.firstName = res.firstName;
      this.model.lastName = res.lastName;
      this.model.email = this.auth.email;
    });
  }

  post() {
    this.saveUser(this.model).subscribe();
  }

  getUser() {
    return this.http
      .get(
        this.BASE_URL + `/user/me?email=${this.auth.email}`,
        this.auth.tokenHeader
      )
      .pipe(map((res) => res.json()));
  }

  saveUser(userData) {
    this.auth.setName(userData.firstName);
    return this.http
      .post(this.BASE_URL + '/user/me', userData, this.auth.tokenHeader)
      .pipe(map((res) => res.json()));
  }
}
