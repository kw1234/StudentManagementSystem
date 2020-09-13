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
    this.getStudents().subscribe((res) => {
      this.studentList = res.studentList;
    });
  }

  getStudents() {
    return this.http
      .get(
        this.BASE_URL + `/tutor/getStudents=${this.auth.email}`,
        this.auth.tokenHeader
      )
      .pipe(map((res) => res.json()));
  }

  addStudent() {
    // Here you can specify the data
    this.studentList.push(this.email);
  }
}
