import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { TableComponent } from './table.component';
import { AssignmentComponent } from './assignment.component';
import { NavbarComponent } from './navbar.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { PaginatorComponent } from './paginator.component';
import { EditUserComponent } from './edituser.component';
import { StudentListComponent } from './student.list.component';
import { StudentListItemComponent } from './student.list.item.component';
import { TutorListComponent } from './tutor.list.component';
import { TutorListItemComponent } from './tutor.list.item.component';

import { TableService } from './table.service';
import { AuthService } from './auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

var routes = [
  {
    path: '',
    component: TableComponent,
  },
  {
    path: 'weeklyPlanner',
    component: TableComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: EditUserComponent,
  },
  {
    path: 'studentList',
    component: StudentListComponent,
  },
  {
    path: 'tutorList',
    component: TutorListComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AssignmentComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    PaginatorComponent,
    EditUserComponent,
    StudentListComponent,
    StudentListItemComponent,
    TutorListComponent,
    TutorListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgbModule,
    RouterModule.forRoot(routes),
  ],
  providers: [TableService, AuthService, MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
