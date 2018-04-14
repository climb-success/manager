import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';



import { StudentListComponent } from './component/student/student-list/student-list.component';
import { StudentDetailComponent } from './component/student/student-detail/student-detail.component';
import { TeacherListComponent } from './component/teacher/teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './component/teacher/teacher-detail/teacher-detail.component';
import { GroupListComponent } from './component/group/group-list/group-list.component';
import { GroupDetailComponent } from './component/group/group-detail/group-detail.component';
import { InformationListComponent } from './component/information/information-list/information-list.component';
import { InformationDetailComponent } from './component/information/information-detail/information-detail.component';

const routes: Routes = [
  { path: 'studentList', component: StudentListComponent },
  { path: 'studentDetail/:id', component: StudentDetailComponent },
  { path: 'teacherList', component: TeacherListComponent },
  { path: 'teacherDetail/:id', component: TeacherDetailComponent },
  { path: 'groupList', component: GroupListComponent },
  { path: 'groupDetail/:id', component: GroupDetailComponent },
  { path: 'informationList', component: InformationListComponent },
  { path: 'informationDetail/:id', component: InformationDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
