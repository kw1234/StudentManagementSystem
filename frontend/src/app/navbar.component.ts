import { Component } from '@angular/core';
import { TableService } from './table.service';

('rxjs/add/operator/toPromise');

('rxjs/Rx');
import { AuthService } from './auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['table.css'],
})
export class NavbarComponent {
  constructor(public tableService: TableService, public auth: AuthService) {}

  ngOnInit() {}
}
