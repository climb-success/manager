import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TeacherUpdateURL, SearchTeacherURL, GetTeacherURL, DeleteTeacherURL, adminName } from '../data-config/mock-datets';
import { Teacher } from '../class/teacher';
import { httpOptions } from '../data-config/mock-datets';
import { LogService } from './log.service';

@Injectable()
export class TeacherService {

  private teacherUpdateURL = TeacherUpdateURL;
  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  updateTeacher(teacher: Teacher): Observable<any> {
    return this.http.post(this.teacherUpdateURL, teacher, httpOptions).pipe(
      tap(_=> this.logService.log(`update teacher`)),
      catchError(this.logService.error<any>('update teacher'))
    );
  }

  getTeacherById(id: string): Observable<Teacher>{
    if (id == null || id.length == 0)
      return null;
    
    var suffix = '';
    var data = [];
    if (adminName != null && adminName.length > 0)
      data.push({_key: "adminName",_value: adminName});
    
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

    return this.http.get<Teacher>(GetTeacherURL + suffix)
      .pipe(
        tap(student => this.logService.log(`fetched teacher`)),
        catchError(this.logService.error<Teacher>('getTeacher id=${id}'))
      );
  }

  searchTeacher(province: string, schoolId: string, professionalId: string, 
    name: string, telePhone: string, requirement: string, grade: string){

    var suffix = '';
    var data = [];
    if (adminName != null && adminName.length > 0)
      data.push({_key: "adminName",_value: adminName});

    if (province != null && province.length > 0)
      data.push({_key: "province",_value: province});
    if (schoolId != null && schoolId.length > 0)
      data.push({_key: "schoolId",_value: schoolId});
    if (professionalId != null && professionalId.length > 0)
      data.push({_key: "professionalId",_value: professionalId});
    if (name != null && name.length > 0)
      data.push({_key: "name",_value: name});
    if (telePhone != null && telePhone.length > 0)
      data.push({_key: "telePhone",_value: telePhone});
    if (requirement != null && requirement.length > 0)
      data.push({_key: "requirement",_value: requirement});
    if (grade != null && grade.length > 0)
      data.push({_key: "grade",_value: grade});

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

    return this.http.get<Teacher[]>(SearchTeacherURL + suffix)
      .pipe(
        tap(teachers => this.logService.log(`fetched teachers`)),
        catchError(this.logService.error('getTeachers', []))
      );
  }

  delete(id: string): Observable<string> {
    return this.http.delete(DeleteTeacherURL + id, httpOptions).pipe(
      tap(result => this.logService.log(`delete teacher`)),
      catchError(this.logService.error<any>('delete teacher'))
    );
  }

}