import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { MessageService} from '../service/message.service';

@Injectable()
export class LogService {

  constructor(
    private messageService: MessageService
  ) { }

  /** Log a HeroService message with the MessageService */
  log(message: string) {
      this.messageService.add('SchoolService: ' + message);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  error<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return Observable.of(result as T);
      };
  }

}
