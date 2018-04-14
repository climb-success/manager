import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PROVINCES, GRADES} from '../../../data-config/mock-datets';
import { SchoolService } from '../../../service/school.service';
import { School } from '../../../class/school';
import { Professional } from '../../../class/professional';
import { ProfessionalService } from '../../../service/professional.service';
import { InformationService } from '../../../service/information.service';
import { Information } from '../../../class/information';

@Component({
  selector: 'app-information-list',
  templateUrl: './information-list.component.html',
  styleUrls: ['./information-list.component.css']
})
export class InformationListComponent implements OnInit {

  provinces: string[];
  schools: School[];
  professionals: Professional[];
  grades: number[];
  informations: Information[];
  selectInfoScope: SelectInfoScope;

  constructor(
    private route: ActivatedRoute,
    private schoolService: SchoolService,
    private professionalService: ProfessionalService,
    private informationService: InformationService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.provinces = PROVINCES;
    this.grades = GRADES;
    this.newSelectInfoScope();
  }

  newSelectInfoScope(): void {
    this.selectInfoScope = {
      province: '', schoolId: '', professionalId: '', 
      year: (new Date().getFullYear() + ''), 
      name: ''};
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
    this.informationService.getInformation(this.selectInfoScope.province,  
      this.selectInfoScope.schoolId, this.selectInfoScope.professionalId, 
      this.selectInfoScope.year, this.selectInfoScope.name)
    .subscribe(informations => {
      this.informations = informations;
    });
  }

  delete(id: string): void { 
    if (confirm("你确定删除这个！！！！")){
      this.informationService.delete(id)
      .subscribe(result => {
        this.onSubmit();
      });
    }
  }
}

export class SelectInfoScope {
  province: string;
  schoolId: string;
  professionalId: string;
  year: string;
  name: string;
}