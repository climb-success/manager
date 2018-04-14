import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PROVINCES, GRADES} from '../../../data-config/mock-datets';
import { SchoolService } from '../../../service/school.service';
import { School } from '../../../class/school';
import { Professional } from '../../../class/professional';
import { ProfessionalService } from '../../../service/professional.service';
import { Group } from '../../../class/group';
import { GroupService } from '../../../service/group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  group: Group;
  
  provinces: string[];
  schools: School[];
  professionals: Professional[];
  grades: number[];
  selectGroupScope: SelectGroupScope;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private schoolService: SchoolService,
    private professionalService: ProfessionalService,
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.provinces = PROVINCES;
    this.grades = GRADES;
    this.newGroup();
    this.newSelectGroupScope();
    this.getGroupById();
  }

  newGroup(): void {
    this.group = {id: 0, name: '',
    qq: '', qqCode: '', weixin: '', 
    weixinCode: '',  year: new Date().getFullYear()+'', 
    schoolId: '', professionalId: ''};
  }

  newSelectGroupScope(): void{
    this.selectGroupScope = {
      province: ''
    };
  }

  getGroupById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == 0)
      return;
    var idString = id + '';

    this.groupService.getGroupById(idString)
    .subscribe(group => {
      
      if (group.schoolId == null || group.schoolId.length == 0){
        group.schoolId = '';
        group.professionalId = '';
        this.selectGroupScope.province = '';
      }
      else{
        this.schoolService.getSchoolById(group.schoolId)
        .subscribe(school => {
          this.selectGroupScope.province = school.province;

          this.schoolService.getSchoolByProvince(school.province)
          .subscribe(schools => {
            this.schools = schools;
          });

          this.professionals = school.professionals;
        });
      }

      if (group.professionalId == null)
        group.professionalId = '';
      if (group.year == null)
        group.year ='';

      this.group = group;
      
    });
  }

  provinceChange(province: string): void {
    this.selectGroupScope.province = province;

    this.group.schoolId = '';
    this.group.professionalId = '';
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

  back(): void {
    //this.location.go(this.location.path(true));
    this.location.back();
  }

  afterSubmit(): void{
    alert('信息已经提交！！');
    if (this.group.id == null || this.group.id == 0)
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
    console.log(JSON.stringify(this.group)); 
    if (this.group.schoolId == null || this.group.schoolId.length == 0)
      this.group.schoolId = null;

    if (this.group.professionalId == null || this.group.professionalId.length == 0)
      this.group.professionalId = null;

    if ((this.group.qq == null || this.group.qq.length == 0) 
        && (this.group.weixinCode == null || this.group.weixinCode.length == 0))
    {
      alert("请填写QQ或者微信二维码链接中的一个");
      return;
    }

    this.groupService.updateGroup(this.group)
    .subscribe(() => this.afterSubmit());
  }

}

export class SelectGroupScope {
  province: string;
}