import { Component, OnInit, Input, group } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PROVINCES, GRADES } from '../../../data-config/mock-datets';
import { SchoolService } from '../../../service/school.service';
import { School } from '../../../class/school';
import { Professional } from '../../../class/professional';
import { ProfessionalService } from '../../../service/professional.service';
import { Group } from '../../../class/group';
import { GroupService } from '../../../service/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  provinces: string[];
  schools: School[];
  professionals: Professional[];
  @Input() selectGroupScope: SelectGroupScope;
  grades: number[];
  groups: Group[];

  constructor(
    private route: ActivatedRoute,
    private schoolService: SchoolService,
    private professionalService: ProfessionalService,
    private groupService: GroupService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.provinces = PROVINCES;
    this.grades = GRADES;
    this.SelectGroupScope();
  }

  SelectGroupScope():void{
    this.selectGroupScope = {
      province: '', schoolId: '', 
      professionalId: '', 
      year: (new Date().getFullYear() + ''), 
      name: ''
    };
  }

  provinceChange(province: string): void {

    this.selectGroupScope.schoolId = '';
    this.selectGroupScope.professionalId = '';
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

  onSubmit() { 
    this.groupService.searchGroups(this.selectGroupScope.province, 
      this.selectGroupScope.schoolId, this.selectGroupScope.professionalId, 
      this.selectGroupScope.year, this.selectGroupScope.name)
    .subscribe(groups => {
      this.groups = groups;
    });
  }

  delete(id: string): void { 
    if (confirm("你确定删除这个！！！！")){
      this.groupService.delete(id)
      .subscribe(result => {
        this.onSubmit();
      });
    }
  }
}

export class SelectGroupScope {
  province: string;
  schoolId: string;
  professionalId: string;
  year: string;
  name: string;
}