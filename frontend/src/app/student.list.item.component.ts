import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'student-list-item',
  templateUrl: 'student.list.item.component.html',
})
export class StudentListItemComponent {
  BASE_URL = 'http://localhost:8080/api';

  constructor(private http: Http, private auth: AuthService) {}

  @Input() email: string = '';
  @Input() firstName: string;
  @Input() lastName: string;
  @Output() public onDelete: EventEmitter<any> = new EventEmitter();
  model = { firstName: '', lastName: '', email: '' };
  studentList = [];
  myHttp = this.http;

  ngOnInit() {}

  goToWeeklyPlanner() {
    this.auth.tutorViewPlanner(this.email);
  }

  delete() {
    /*const prom = new Promise(function (resolve, reject) {
      this.http
        .get(this.BASE_URL + `/tutor/getStudents?email=${this.auth.email}`)
        .subscribe((response) => {
          console.log(response.json().studentList);
          this.studentList = response.json().studentList;
        });
    });*/
    const tutorEmail = this.auth.email;
    this.http
      .get(this.BASE_URL + `/tutor/getStudents?email=${tutorEmail}`)
      .toPromise()
      .then(function (result) {
        const studentList = result.json().studentList;
        return studentList;
      })
      .then((studentList) => studentList.filter(this.dontDelete, this.email))
      .then(function (result) {
        console.log(result);
        const entry = {
          email: tutorEmail,
          studentList: result,
        };
        console.log(entry);
        return entry;
      })
      .then((entry) => this.updateHelper(entry));
    /*.then(function (result) {
        // (**
        const studentList = result.json().studentList;
        const entry = {
          email: tutorEmail,
          studentList,
        };
        this.updateHelper(entry);
      });*/
  }

  updateHelper(entry) {
    console.log(entry);
    this.http.post(this.BASE_URL + '/tutor/updateStudentList', entry).subscribe(
      (response) => {
        console.log(response.json());
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

  dontDelete(value) {
    return value.email !== this;
  }
}
