import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  public subject = new Subject<any>();
  constructor(private injector: Injector) {
    this.subject.subscribe(e => {
      console.log('SERVICE', this.subject)
    })
    setTimeout(() => {
      console.log(this.subject)
    }, 1000)
   }
  
  handleError(error: any) {
  

    let router = this.injector.get(Router);
    console.log('URL: ' + router.url);

    if (error instanceof HttpErrorResponse) {
      //Backend returns unsuccessful response codes such as 404, 500 etc.				  
      console.error('Backend returned status code: ', error.status);
      console.error('Response body:', error.message);          	  
  } else {
      //A client-side or network error occurred.	          
      console.error('An error occurred:', error.message);          
  }   
 
  this.subject.next({ text: error });
  router.navigate(['/error']);

  }

  showError():Observable<any> {
    // debugger
    return this.subject;

  }



}