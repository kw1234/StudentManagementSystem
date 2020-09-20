import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tutor-list-item',
  templateUrl: 'tutor.list.item.component.html',
})
export class TutorListItemComponent {
  BASE_URL = 'http://localhost:8080/api';

  constructor(private http: Http, private auth: AuthService) {}

  @Input() email: string = '';
  @Input() firstName: string;
  @Input() lastName: string;
  @Output() public onDelete: EventEmitter<any> = new EventEmitter();
  model = { firstName: '', lastName: '', email: '' };
  studentList = [];
  myHttp = this.http;

  ngOnInit() {
    this.http
      .get(this.BASE_URL + `/tutor/getStudents?email=${this.email}`)
      .subscribe((response) => {
        console.log(response.json().studentList);
        this.studentList = response.json().studentList;
      });
  }

  getStudents() {
    this.http
      .get(this.BASE_URL + `/tutor/getStudents?email=${this.email}`)
      .subscribe((response) => {
        console.log(response.json().studentList);
        this.studentList = response.json().studentList;
      });
  }
}
