import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SchoolService } from './service/school.service';
import { MessagesComponent } from './component/messages/messages.component';
import { MessageService } from './service/message.service';
import { ProfessionalService } from './service/professional.service';
import { StudentService } from './service/student.service';
import { LogService } from './service/log.service';
import { TeacherService } from './service/teacher.service';
import { GroupService } from './service/group.service';
import { InformationService } from './service/information.service';

import { StudentListComponent } from './component/student/student-list/student-list.component';
import { StudentDetailComponent } from './component/student/student-detail/student-detail.component';
import { TeacherListComponent } from './component/teacher/teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './component/teacher/teacher-detail/teacher-detail.component';
import { GroupListComponent } from './component/group/group-list/group-list.component';
import { GroupDetailComponent } from './component/group/group-detail/group-detail.component';
import { InformationListComponent } from './component/information/information-list/information-list.component';
import { InformationDetailComponent } from './component/information/information-detail/information-detail.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    MessagesComponent,
    StudentListComponent,
    StudentDetailComponent,
    TeacherDetailComponent,
    TeacherListComponent,
    GroupListComponent,
    GroupDetailComponent,
    InformationListComponent,
    InformationDetailComponent,
  ],

  providers: [
    SchoolService, 
    MessageService, 
    ProfessionalService, 
    StudentService, 
    LogService, 
    TeacherService, 
    GroupService, 
    InformationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
