import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

    checkToken():any{
          return this.http.checkToken()
    }

    logIn(username,password):any {  
      const body ={username:username,password:password}
      return this.http.post(body)
    }
   
  }
