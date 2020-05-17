import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { TechTalkService } from './http-services/tech-talk.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MsAdalAngular6Module.forRoot({
      tenant: '93433aaf-d242-47f3-827c-1ad3dd5c978a',
      clientId: 'a2d71cf9-dea5-4cc5-ad46-5f13a1943bcd',
      redirectUri: window.location.origin,
      endpoints: {
        "api": "227f010a-2682-4ab0-b432-737887d9b0f9",
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: '<localStorage / sessionStorage>',
    }),
  ],
  providers: [AuthenticationGuard,TechTalkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
