import { Component, OnInit, Injector, } from '@angular/core';
import { TweetService } from '../../tweet.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { GlobalErrorHandlerService } from 'src/app/global-error-handler.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [TweetService]
})
export class LoginComponent implements OnInit {
  name;
  password;
  constructor(
    private userService: UserService,    private injector: Injector,
    public globalErrorHandlerService:GlobalErrorHandlerService
  ) { }

  ngOnInit() {

  }
  logIn(): any {
    this.userService.logIn(this.name, this.password)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
  this.injector.get(Router).navigate(['/admin']);
        }
      )
  }
}
