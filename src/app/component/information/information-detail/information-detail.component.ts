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
  selector: 'app-information-detail',
  templateUrl: './information-detail.component.html',
  styleUrls: ['./information-detail.component.css']
})
export class InformationDetailComponent implements OnInit {

  information: Information;
  
  provinces: string[];
  schools: School[];
  professionals: Professional[];
  grades: number[];
  selectInformationScope: SelectInformationScope;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private schoolService: SchoolService,
    private professionalService: ProfessionalService,
    private informationService: InformationService,
  ) { }

  ngOnInit() {
    this.provinces = PROVINCES;
    this.grades = GRADES;
    this.newInformation();
    this.newSelectInformationScope();
    this.getInformationById();
  }

  newInformation(): void {
    this.information = {id: 0, name: '',
    informationCategoryId: '', schoolId: '', 
    professionalId: '', url: '', 
    content: '', year: new Date().getFullYear()+'',
    realUrl: ''};
  }

  newSelectInformationScope(): void{
    this.selectInformationScope = {
      province: ''
    };
  }

  getInformationById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == 0)
      return;
    var idString = id + '';

    this.informationService.getInformationById(idString)
    .subscribe(information => {
      
      if (information.schoolId == null || information.schoolId.length == 0){
        information.schoolId = '';
        information.professionalId = '';
        this.selectInformationScope.province = '';
      }
      else{
        this.schoolService.getSchoolById(information.schoolId)
        .subscribe(school => {
          this.selectInformationScope.province = school.province;

          this.schoolService.getSchoolByProvince(school.province)
          .subscribe(schools => {
            this.schools = schools;
          });

          this.professionals = school.professionals;
        });
      }

      if (information.professionalId == null)
        information.professionalId = '';
      if (information.year == null)
        information.year ='';

      this.information = information;
      
    });
  }

  provinceChange(province: string): void {
    this.selectInformationScope.province = province;

    this.information.schoolId = '';
    this.information.professionalId = '';
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
    this.information.professionalId = '';
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

    if (this.information.id == null || this.information.id == 0)
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
    console.log(JSON.stringify(this.information)); 
    if (this.information.schoolId.length == 0)
      this.information.schoolId = null;

    if (this.information.professionalId.length == 0)
      this.information.professionalId = null;

    this.informationService.updateInformation(this.information)
    .subscribe(() => this.afterSubmit());
  }

}

export class SelectInformationScope {
  province: string;
}