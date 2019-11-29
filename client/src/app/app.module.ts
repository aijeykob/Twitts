import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core'
import { AppRoutingModule } from './app-routing.module';
import {LoginComponent} from './components/login/login.component'
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { HttpService } from './http.service';
import { TweetService } from './tweet.service';
import { UserService } from './user.service';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { GlobalErrorComponent } from './components/errors/globalError.component';
import { environment } from '../environments/environment'

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    GlobalErrorComponent
  ],
  providers: [
    GlobalErrorHandlerService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    HttpService,
    TweetService,
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
