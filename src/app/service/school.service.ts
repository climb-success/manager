import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SearchSchoolProvinceURL} from '../data-config/mock-datets';
import { SearchProfessionalSchoolURL } from '../data-config/mock-datets';
import { School } from '../class/school';
import { LogService } from './log.service'

@Injectable()
export class SchoolService {
  private searchSchoolProvinceURL = SearchSchoolProvinceURL;
  private searchProfessionalSchoolURL = SearchProfessionalSchoolURL;

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }
  
  getSchoolByProvince(province: string): Observable<School[]> {
    if (province == null || province.length == 0) {
      return School[0];
    }

    return this.http.get<School[]>(this.searchSchoolProvinceURL + province)
      .pipe(
        tap(schools => this.logService.log(`fetched schools province`)),
        catchError(this.logService.error('getSchoolByProvince', []))
      );
  }

  getSchoolById(id: string): Observable<School> {
    if (id == null || id.length == 0) {
      return;
    }

    return this.http.get<School>(this.searchProfessionalSchoolURL + id)
      .pipe(
        tap(school => this.logService.log(`fetched school id`)),
        catchError(this.logService.error<School>(`getSchool id=${id}`))
      );
  }
}
