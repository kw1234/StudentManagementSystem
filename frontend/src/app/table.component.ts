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
  selector: 'scheduleTable',
  templateUrl: './table.component.html',
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
export class TableComponent {
  dataSource = [];
  classList = [];
  colNames = [
    'class',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'letterGrade',
    'percentage',
    'comments',
    'todo',
    'save',
  ];
  animal: string;
  name: string;

  BASE_URL = this.tableService.baseUrl;

  constructor(
    public tableService: TableService,
    public auth: AuthService,
    private http: Http
  ) {}

  ngOnInit() {
    console.log(this.auth.plannerEmail);
    this.getTableData(
      this.auth.plannerEmail,
      String(parseInt(this.tableService.getCurrentWeek()) - 1)
    );
  }

  getTableData(email, weekId) {
    this.http
      .get(this.BASE_URL + `/getData?email=${email}&weekId=${weekId}`)
      .subscribe(
        (response) => {
          console.log(response);

          const result = response.json();
          this.dataSource = result.plannerData;

          this.http
            .get(
              this.BASE_URL +
                `/student/getClassList?email=${this.auth.plannerEmail}`
            )
            .toPromise()
            .then(function (result) {
              const classList = result.json().classList;
              return classList;
            })
            .then((classList) => this.updateDataSourceHelper(classList));
        },
        (error) => {
          console.log(`unable to save data with error: ${error}`);
        }
      );
  }

  getStudentClassList(email) {
    this.http
      .get(this.BASE_URL + `/student/classList?email=${email}`)
      .subscribe(
        (response) => {
          console.log(response);
          const result = response.json();
          this.classList = result.classList;
          console.log(this.classList);
        },
        (error) => {
          console.log(`unable to get class list data with error: ${error}`);
        }
      );
  }

  updateDataSourceHelper(classList) {
    console.log(classList);
    this.classList = classList;
    if (!this.dataSource) this.dataSource = [];
    for (let i = 0; i < 8; i++) {
      if (this.dataSource.length < 8) {
        this.dataSource.push({
          class: classList[i],
          monday: {
            name: '',
            type: '',
            progress: '',
          },
          tuesday: {
            name: '',
            type: '',
            progress: '',
          },
          wednesday: {
            name: '',
            type: '',
            progress: '',
          },
          thursday: {
            name: '',
            type: '',
            progress: '',
          },
          friday: {
            name: '',
            type: '',
            progress: '',
          },
          letterGrade: '',
          percentage: '',
          gradeColor: '',
          comments: '',
          todo: '',
        });
      } else {
        this.dataSource[i]['class'] = classList[i];
      }
    }
  }

  tableInput() {
    const entry = {
      rows: this.dataSource,
      email: this.auth.plannerEmail,
      weekId: String(this.tableService.currWeekId),
    };
    this.http.post(this.BASE_URL + '/postData', entry).subscribe(
      (response) => {
        const result = response.json();
        this.dataSource = result.plannerData;
      },
      (error) => {
        console.log(`unable to save data with error: ${error}`);
      }
    );
  }

  getClassListFromChild(classList) {
    console.log('received class list from child');
    console.log(classList);
    for (let i = 0; i < 8; i++) {
      this.dataSource[i]['class'] = classList[i];
    }
    this.tableInput();
  }
}
