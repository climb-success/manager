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
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  student: Student;

  provinces: string[];
  schools: School[];
  professionals: Professional[];
  grades: number[];
  statuss: string[];
  selectStudentScope: SelectStudentScope;

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
    this.newStudent();
    this.newSelectStudentScope();
    this.getStudentById();
  }

  newStudent(): void {
    this.student = {id: 0, name: '',
    schoolId: '', professionalId: '',
    telePhone: '', qq: '', weixin: '',
    requirement: '', 
    grade: new Date().getFullYear()+'', 
    status: ''};
  }

  newSelectStudentScope(): void{
    this.selectStudentScope = {
      province: ''
    };
  }

  getStudentById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == 0)
      return;
    var idString = id + '';

    this.studentService.getStudentById(idString)
    .subscribe(student => {
      
      if (student.schoolId == null || student.schoolId.length == 0){
        student.schoolId = '';
        student.professionalId = '';
        this.selectStudentScope.province = '';
      }
      else{
        this.schoolService.getSchoolById(student.schoolId)
        .subscribe(school => {
          this.selectStudentScope.province = school.province;

          this.schoolService.getSchoolByProvince(school.province)
          .subscribe(schools => {
            this.schools = schools;
          });

          this.professionals = school.professionals;
        });
      }
        
      if (student.professionalId == null)
        student.professionalId = '';

      if (student.grade == null)
        student.grade ='';

      this.student = student;
      
    });
  }

  provinceChange(province: string): void {
    this.selectStudentScope.province = province;

    this.student.schoolId = '';
    this.student.professionalId = '';
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
    this.student.professionalId = '';
    this.professionals = null;
    if (id == null || id.length == 0)
      return;
    this.schoolService.getSchoolById(id)
      .subscribe(school => {
        this.professionals = school.professionals;
      });
  }

  back(): void {
    //this.location.go(this.location.path(true));
    this.location.back();
  }

  afterSubmit(): void{
    alert('信息已经提交！！');
    if (this.student.id == null || this.student.id == 0)
      this.back();
    else
      this.refresh();
  }

  refresh(): void {
    
    setTimeout(function () {
      window.location.reload();
    }, '1000');
  }

  onSubmit() { 
    console.log(JSON.stringify(this.student)); 
    if (this.student.schoolId.length == 0)
      this.student.schoolId = null;

    if (this.student.professionalId.length == 0)
      this.student.professionalId = null;
    if (this.student.grade.length == 0)
      this.student.grade = null;

    this.studentService.updateStudent(this.student)
    .subscribe(() => this.afterSubmit());
  }

}

export class SelectStudentScope {
  province: string;
}