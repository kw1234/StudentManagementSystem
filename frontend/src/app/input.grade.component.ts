import { Component, Inject } from '@angular/core';
import { TableService } from './table.service';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
('rxjs/add/operator/toPromise');

('rxjs/Rx');

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'input-grades',
  templateUrl: './input.grade.component.html',
  styleUrls: ['table.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class InputGradeComponent {
  dataSource = [];
  classList = [];

  //BASE_URL = 'https://studentsystem-288207.uc.r.appspot.com/api';
  BASE_URL = this.tableService.baseUrl;

  constructor(
    public tableService: TableService,
    public auth: AuthService,
    private http: Http
  ) {}

  ngOnInit() {
    console.log(this.auth.plannerEmail);
  }

  updateDataSourceHelper(classList) {}

  getStudentClassList(email) {
    this.http
      .get(this.BASE_URL + `/student/classList?email=${email}`)
      .subscribe(
        (response) => {
          console.log(response);
          const result = response.json();
          this.classList = result.classList;
        },
        (error) => {
          console.log(`unable to get class list data with error: ${error}`);
        }
      );
  }
}
