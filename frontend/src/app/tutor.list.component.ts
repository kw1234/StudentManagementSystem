import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { TableService } from './table.service';

@Component({
  selector: 'tutor-list',
  templateUrl: 'tutor.list.component.html',
})
export class TutorListComponent {
  BASE_URL = this.table.baseUrl;

  constructor(
    private http: Http,
    private auth: AuthService,
    public table: TableService
  ) {}

  tutorList = [];
  email;
  firstName;
  lastName;

  ngOnInit() {
    this.http
      .get(this.BASE_URL + `/admin/getTutors?email=${this.auth.email}`)
      .subscribe((response) => {
        console.log(response.json().tutorList);
        this.tutorList = response.json().tutorList;
      });
  }

  getStudents() {
    return;
  }

  addTutor() {
    // Here you can specify the data
    console.log(this.tutorList);
    console.log(this.email);
    this.tutorList.push({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    });
    const entry = {
      email: this.auth.email,
      tutorList: this.tutorList,
    };
    this.http.post(this.BASE_URL + '/admin/updateTutorList', entry).subscribe(
      (response) => {
        //console.log(response);
        //this.textStore = [response.json()];
        //this.textSubject.next(this.textStore);
        //this.getFileNames();
        const result = response.json();
        //this.studentList = result.studentList;
      },
      (error) => {
        console.log(
          `unable to add tutor to admin's tutorList with error: ${error}`
        );
      }
    );
  }
}
