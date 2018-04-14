import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StudentUpdateURL, SearchStudentURL, GetStudentURL, DeleteStudentURL, adminName} from '../data-config/mock-datets';
import { Student } from '../class/student';
import { httpOptions } from '../data-config/mock-datets';
import { LogService } from './log.service';


@Injectable()
export class StudentService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  updateStudent(student: Student): Observable<any> {
    return this.http.post(StudentUpdateURL, student, httpOptions).pipe(
      tap(_=> this.logService.log(`update student`)),
      catchError(this.logService.error<any>('update student'))
    );
  }

  getStudentById(id: string): Observable<Student>{
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

    return this.http.get<Student>(GetStudentURL + suffix)
      .pipe(
        tap(student => this.logService.log(`fetched student`)),
        catchError(this.logService.error<Student>('getStudent id=${id}'))
      );
  }

  searchStudent(province: string, schoolId: string, professionalId: String, 
    name: string, telePhone: string, requirement: string, 
    grade: string, status: string){

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
    if (status != null && status.length > 0)
      data.push({_key: "status",_value: status});

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

      console.log(suffix);
    return this.http.get<Student[]>(SearchStudentURL + suffix)
      .pipe(
        tap(students => this.logService.log(`fetched student`)),
        catchError(this.logService.error('getStudent', []))
      );
  }

  delete(id: string): Observable<string> {
    return this.http.delete(DeleteStudentURL + id, httpOptions).pipe(
      tap(result => this.logService.log(`delete student`)),
      catchError(this.logService.error<any>('delete student'))
    );
  }
}
