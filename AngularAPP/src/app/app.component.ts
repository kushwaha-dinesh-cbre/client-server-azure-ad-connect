import { Component } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TechTalkService } from './http-services/tech-talk.service';
import { TechTalkItem } from './models/tech-talk-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-azure-ad-connect';
  acquireToken: any;
  techTalkTitle: any;

  constructor(private adalService: MsAdalAngular6Service,
    private router: Router,
    private techTalkService: TechTalkService) {
    // this.adalService.acquireToken('<RESOURCE>').subscribe((resToken: string) => {
    //   this.acquireToken = resToken;
    // });
  }
  get loggedInUserEmail(): any {
    return this.adalService.LoggedInUserEmail;
  }
  get loggedInUserName(): any {
    return this.adalService.LoggedInUserName;
  }

  login(): void {
    if (!this.adalService.userInfo) {
      this.adalService.login();
    }
  }

  logout(): void {
    this.adalService.logout();
  }

  createTechTalk() {
    debugger;
    var item = new TechTalkItem();
    item.title = this.techTalkTitle;
    this.techTalkService.addNewTechTalkItem(item).
      subscribe((data): any => {

      });
  }

  // getAccessToken(): Observable<any> {
  //   return this.adalService.acquireToken('backend-api-uri');
  // }

  getToken(): string {
    return this.adalService.accessToken;
  }

}
