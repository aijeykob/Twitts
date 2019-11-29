import { Component, OnInit, Input, } from '@angular/core';
import { TweetService } from '../../tweet.service';
import { UserService } from '../../user.service';
import { GlobalErrorHandlerService } from 'src/app/global-error-handler.service';
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [TweetService,UserService]
})
export class AdminComponent implements OnInit {

  constructor(private tweetService: TweetService, private userService: UserService, globalErrorHandlerService:GlobalErrorHandlerService) { }
  timeCron = 0;
  tweet;
  success;
  la: number = 43.913723261972855;
  lo: number = -72.54272478125;
  ra: number = 100000;
  locationChosen = false;
  searchText;
  ngOnInit() {
    this.checkToken();

  }

  checkToken(): void {
    this.userService.checkToken()
        .subscribe(res => {
          this.success = res.success
        },
          err => {throw err}
        )
  }

  onChoseLocation(event) {
    this.la = event.coords.lat;
    this.lo = event.coords.lng;
    this.locationChosen = true;
  }

  onRadiusChange(event): void {
    this.ra = Math.round(event)
  }
  onCenterChange(event): void {
    this.la = event.lat;
    this.lo = event.lng;
  }
  getTweets(): void {
    this.tweetService.getTwittsbyAdmin(this.la, this.lo, this.ra, this.searchText, this.timeCron)
      .subscribe(
        newTweet => {
          this.tweet = newTweet
        }
      )
  }
  clearFilds(): void {
    this.timeCron = 0
    this.la = null
    this.lo = null
    this.ra = null
    this.searchText = null
  }

}
