import { Injectable } from '@angular/core';
import { HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})

export class TweetService {

  constructor(private http: HttpService) { }

  getTwittsbyAdmin(la, lo, ra, searchText, timeCron): any {
    const body = { la: la, lo: lo, ra: ra, searchText: searchText, timeCron: timeCron };
    return this.http.getforAdmin(body)
  }

  getTwittsbyUser(): any {
    return this.http.get()
  }
}
