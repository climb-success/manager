import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {School} from '../class/school';
import { Professional} from '../class/professional';
import { LogService } from './log.service'

@Injectable()
export class ProfessionalService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

}
