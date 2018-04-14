import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { httpOptions } from '../data-config/mock-datets';
import { LogService } from './log.service';
import { InformationUpdateURL, InformationSearchURL, GetInformationURL, DeleteInformationURL } from '../data-config/mock-datets';
import { Information } from '../class/information';

@Injectable()
export class InformationService {

  private informationSearchURL = InformationSearchURL;
  suffix: string;

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  updateInformation(information: Information): Observable<any> {
    return this.http.post(InformationUpdateURL, information, httpOptions).pipe(
      tap(_=> this.logService.log(`update information`)),
      catchError(this.logService.error<any>('update information'))
    );
  }

  getInformationById(id: string): Observable<Information>{
    if (id == null || id.length == 0)
      return null;
    
    var suffix = '';
    var data = [];
    data.push({_key: "id",_value: id});

    for (var i in data) {
      var key = data[i]._key;
      var value = data[i]._value;
      if (suffix.length > 0)
        suffix = suffix + '&' + key + '=' + value;
      else
        suffix = key + '=' + value;
    }   

    if (suffix.length > 0)
      suffix = '?' + suffix;

    return this.http.get<Information>(GetInformationURL + suffix)
      .pipe(
        tap(information => this.logService.log(`fetched information`)),
        catchError(this.logService.error<Information>('getInformation id=${id}'))
      );
  }_

  getInformation(province: string, schoolId: string, professionalId: string, 
    year: string, name: string): Observable<Information[]> {

    this.suffix = '';
    var data = [];
    if (province != null && province.length > 0)
      data.push({_key: "province",_value: province});
    if (schoolId != null && schoolId.length > 0)
      data.push({_key: "schoolId",_value: schoolId});
    if (professionalId != null && professionalId.length > 0)
      data.push({_key: "professionalId",_value: professionalId});
    if (year != null && year.length > 0)
      data.push({_key: "year",_value: year});
    if (name != null && name.length > 0)
      data.push({_key: "name",_value: name});

    for (var i in data) {
      var key = data[i]._key;
      var value = data[i]._value;
      if (this.suffix.length > 0)
        this.suffix = this.suffix + '&' + key + '=' + value;
      else
        this.suffix = key + '=' + value;
    }   

    if (this.suffix.length > 0)
     this.suffix = '?' + this.suffix;

    return this.http.get<Information[]>(this.informationSearchURL + this.suffix)
      .pipe(
        tap(informations => this.logService.log(`fetched information`)),
        catchError(this.logService.error('getInformation', []))
      );
  }

  delete(id: string): Observable<string> {
    return this.http.delete(DeleteInformationURL + id, httpOptions).pipe(
      tap(result => this.logService.log(`delete information`)),
      catchError(this.logService.error<any>('delete information'))
    );
  }
}