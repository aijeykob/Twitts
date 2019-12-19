import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable()
export class HttpService {

  url = environment.api_host;
  constructor(private http: HttpClient) { }
  setHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

  }

  get(body?) {

    return this.http.get(this.url + 'getTweets', { params: body || null, headers: this.setHeader() })
  }

  getforAdmin(body?) {
    return this.http.get(this.url+'admin', { params: body || null, headers: this.setHeader() })
  }
  
  checkToken() {
    return this.http.get(this.url + 'testCheck', { headers: this.setHeader() })
  }

  post(body) {
    return this.http.post(this.url + 'login', body, { headers: this.setHeader() })

  }
}
