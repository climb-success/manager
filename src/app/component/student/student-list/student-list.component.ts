import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PROVINCES, GRADES, STATUSS} from '../../../data-config/mock-datets';
import { SchoolService } from '../../../service/school.service';
import { School } from '../../../class/school';
import { Professional } from '../../../class/professional';
import { ProfessionalService } from '../../../service/professional.service';
import { Student } from '../../../class/student';
import { StudentService } from '../../../service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[];

  provinces: string[];
  schools: School[];
  professionals: Professional[];
  grades: number[];
  statuss: string[];
  selectInfoScope: SelectInfoScope;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private schoolService: SchoolService,
    private professionalService: ProfessionalService,
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.provinces = PROVINCES;
    this.grades = GRADES;
    this.statuss = STATUSS;
    this.SelectInfoScope();
  }

  SelectInfoScope(): void {
    this.selectInfoScope = {
    province: '', name: '', schoolId: '', 
    professionalId: '', telePhone: '', requirement: '', 
    grade: new Date().getFullYear()+'',
    status: ''};
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
    this.studentService.searchStudent(
      this.selectInfoScope.province, this.selectInfoScope.schoolId, 
      this.selectInfoScope.professionalId, this.selectInfoScope.name, 
      this.selectInfoScope.telePhone, this.selectInfoScope.requirement, 
      this.selectInfoScope.grade, this.selectInfoScope.status)
    .subscribe(students => {
      this.students = students;
    });
  }

  delete(id: string): void { 
    if (confirm("你确定删除这个！！！！")){
      this.studentService.delete(id)
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
  status: string; 
}