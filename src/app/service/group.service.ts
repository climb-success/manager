import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Group } from '../class/group';
import { GroupSearchURL, GetGroupURL, UpdateGroupURL, DeleteGroupURL } from '../data-config/mock-datets';
import { httpOptions } from '../data-config/mock-datets';
import { LogService } from './log.service';

@Injectable()
export class GroupService {

  private groupSearchURL = GroupSearchURL;

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  updateGroup(group: Group): Observable<any> {
    return this.http.post(UpdateGroupURL, group, httpOptions).pipe(
      tap(_=> this.logService.log(`update group`)),
      catchError(this.logService.error<any>('update group'))
    );
  }

  getGroupById(id: string): Observable<Group>{
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

    return this.http.get<Group>(GetGroupURL + suffix)
      .pipe(
        tap(information => this.logService.log(`fetched group`)),
        catchError(this.logService.error<Group>('getGroup id=${id}'))
      );
  }

  searchGroups(province: string, schoolId: string, 
    professionalId: string, year: string, name: string): Observable<Group[]> {

    if (province == null 
      && schoolId == null 
      && professionalId == null) {
      return Group[0];
    }

    var suffix = '';
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
      if (suffix.length > 0)
        suffix = suffix + '&' + key + '=' + value;
      else
        suffix = key + '=' + value;
    }   

    if (suffix.length > 0)
     suffix = '?' + suffix;

    return this.http.get<Group[]>(this.groupSearchURL + suffix)
      .pipe(
        tap(groups => this.logService.log(`fetched groups`)),
        catchError(this.logService.error('getGroups', []))
      );
  }

  delete(id: string): Observable<string> {
    return this.http.delete(DeleteGroupURL + id, httpOptions).pipe(
      tap(result => this.logService.log(`delete information`)),
      catchError(this.logService.error<any>('delete information'))
    );
  }

}
