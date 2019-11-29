import { Component, OnInit, } from '@angular/core';
import { TweetService } from '../../tweet.service';
import { UserService } from '../../user.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TweetService]
})
export class HomeComponent implements OnInit {
  tweet;
  constructor(
    private tweetService: TweetService) { }

  ngOnInit() {
    this.getTweets()

  }
  getTweets() {
    this.tweetService.getTwittsbyUser()
      .subscribe(
        newTweet => {
          this.tweet = newTweet
        }
      )
  }

}
