import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PROVINCES, GRADES} from '../../../data-config/mock-datets';
import { SchoolService } from '../../../service/school.service';
import { School } from '../../../class/school';
import { Professional } from '../../../class/professional';
import { ProfessionalService } from '../../../service/professional.service';
import { Teacher } from '../../../class/teacher';
import { TeacherService } from '../../../service/teacher.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {

  teacher: Teacher;
  
  provinces: string[];
  schools: School[];
  professionals: Professional[];
  grades: number[];
  selectTeacherScope: SelectTeacherScope;

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
    this.newTeacher();
    this.newSelectTeacherScope();
    this.getTeacherById();
  }

  newTeacher(): void {
    this.teacher = {id: 0, name: '',
    schoolId: '', professionalId: '',
    telePhone: '', qq: '', weixin: '',
    requirement: '', score: '',
    grade: new Date().getFullYear()+''};
  }

  newSelectTeacherScope(): void{
    this.selectTeacherScope = {
      province: ''
    };
  }
  
  getTeacherById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == 0)
      return;
    var idString = id + '';

    this.teacherService.getTeacherById(idString)
    .subscribe(teacher => {
      
      if (teacher.schoolId == null || teacher.schoolId.length == 0){
        teacher.schoolId = '';
        teacher.professionalId = '';
        this.selectTeacherScope.province = '';
      }
      else{
        this.schoolService.getSchoolById(teacher.schoolId)
        .subscribe(school => {
          this.selectTeacherScope.province = school.province;

          this.schoolService.getSchoolByProvince(school.province)
          .subscribe(schools => {
            this.schools = schools;
          });

          this.professionals = school.professionals;
        });
      }
        
      if (teacher.professionalId == null)
        teacher.professionalId = '';
      if (teacher.grade == null)
        teacher.grade ='';

      this.teacher = teacher;
      
    });
  }

  provinceChange(province: string): void {
    this.selectTeacherScope.province = province;

    this.teacher.schoolId = '';
    this.teacher.professionalId = '';
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
    this.teacher.professionalId = '';
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
    if (this.teacher.id == null || this.teacher.id == 0)
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
    console.log(JSON.stringify(this.teacher)); 
    if (this.teacher.schoolId.length == 0)
      this.teacher.schoolId = null;

    if (this.teacher.professionalId.length == 0)
      this.teacher.professionalId = null;
    if (this.teacher.grade.length == 0)
      this.teacher.grade = null;

    this.teacherService.updateTeacher(this.teacher)
    .subscribe(() => this.afterSubmit());
  }
}

export class SelectTeacherScope {
  province: string;
}