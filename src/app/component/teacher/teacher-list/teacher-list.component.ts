import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PROVINCES, GRADES, SearchTeacherURL} from '../../../data-config/mock-datets';
import { SchoolService } from '../../../service/school.service';
import { School } from '../../../class/school';
import { Professional } from '../../../class/professional';
import { ProfessionalService } from '../../../service/professional.service';
import { Teacher } from '../../../class/teacher';
import { TeacherService } from '../../../service/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  provinces: string[];
  schools: School[];
  professionals: Professional[];
  grades: number[];
  teachers: Teacher[];
  selectInfoScope: SelectInfoScope;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private schoolService: SchoolService,
    private professionalService: ProfessionalService,
    private teacherService: TeacherService,
  ) { }

  ngOnInit() {
    this.provinces = PROVINCES;
    this.grades = GRADES;
    this.SelectInfoScope();
  }

  SelectInfoScope(): void {
    this.selectInfoScope = {
    province: '', name: '', schoolId: '', professionalId: '',
    telePhone: '', requirement: '', 
    grade: new Date().getFullYear()+'',};
  }

  provinceChange(province: string): void {
    this.selectInfoScope.schoolId = '';
    this.selectInfoScope.professionalId = '';
    this.schools = null;
    this.professionals = null;

    if (province == null || province.length == 0) {
      return;
    }

    this.schoolService.getSchoolByProvince(province)
      .subscribe(schools => {
        this.schools = schools;
      });
  }

  schoolChange(id: string): void {
    this.selectInfoScope.professionalId = '';
    this.professionals = null;
    if (id == null || id.length == 0)
      return;
    this.schoolService.getSchoolById(id)
      .subscribe(school => {
        this.professionals = school.professionals;
      });
  }

  onSubmit() { 
    this.teacherService.searchTeacher(
      this.selectInfoScope.province, this.selectInfoScope.schoolId, 
      this.selectInfoScope.professionalId, this.selectInfoScope.name, 
      this.selectInfoScope.telePhone, this.selectInfoScope.requirement, 
      this.selectInfoScope.grade)
    .subscribe(teachers => {
      this.teachers = teachers;
    });
  }

  delete(id: string): void { 
    if (confirm("你确定删除这个！！！！")){
      this.teacherService.delete(id)
      .subscribe(result => {
        this.onSubmit();
      });
    }
  }

}

export class SelectInfoScope {
  province: string;
  name: string;
  schoolId: string;
  professionalId: string;
  telePhone: string;
  requirement: string;
  grade: string;
}