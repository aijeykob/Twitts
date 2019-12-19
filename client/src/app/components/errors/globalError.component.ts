import { Component,OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalErrorHandlerService } from 'src/app/global-error-handler.service';

@Component({
    templateUrl: './globalError.component.html',
    providers: [GlobalErrorHandlerService]
})
export class GlobalErrorComponent  implements OnDestroy{
  messages: any[] = [];
  subscription: any;

  constructor(private globalErrorHandlerService:GlobalErrorHandlerService) { 
    this.subscription = this.globalErrorHandlerService.showError()
    this.subscription.subscribe(message => {
      // debugger
  
      if (message) {
        this.messages.push(message);
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
      console.log(message)
    });
  }
    ngOnInit() {
    }
    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      if (this.subscription)
      	this.subscription.unsubscribe();
  }
} 