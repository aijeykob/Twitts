import { Component, OnInit, Input, } from '@angular/core';
import { TweetService } from './tweet.service';
import { GlobalErrorHandlerService } from './global-error-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TweetService]
})
export class AppComponent implements OnInit {
subs
  constructor(
    private tweetService: TweetService,
    private sub: GlobalErrorHandlerService
    ) {
sub.subject.subscribe(e => {
  console.log('ERROR', e)
})

console.log('subscribed')
     }

  ngOnInit() {
  }
}
