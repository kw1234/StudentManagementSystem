import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'studentlist',
  templateUrl: 'student.list.component.html',
})
export class StudentListComponent {
  BASE_URL = 'http://localhost:8080/api';

  constructor(private http: Http, private auth: AuthService) {}

  studentList = [];
  email;

  ngOnInit() {
    this.http
      .get(this.BASE_URL + `/tutor/getStudents?email=${this.auth.email}`)
      .subscribe((response) => {
        console.log(response.json().studentList);
        this.studentList = response.json().studentList;
      });
  }

  getStudents() {
    return;
  }

  addStudent() {
    // Here you can specify the data
    console.log(this.studentList);
    console.log(this.email);
    this.studentList.push(this.email);
    const entry = {
      email: this.auth.email,
      studentList: this.studentList,
    };
    this.http.post(this.BASE_URL + '/tutor/updateStudentList', entry).subscribe(
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
          `unable to add student to tutor's studentList with error: ${error}`
        );
      }
    );
  }
}
