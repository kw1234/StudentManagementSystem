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

  @Input() email: string;
  @Input() firstName: string;
  @Input() lastName: string;
  model = { firstName: '', lastName: '', email: '' };

  ngOnInit() {}
}
