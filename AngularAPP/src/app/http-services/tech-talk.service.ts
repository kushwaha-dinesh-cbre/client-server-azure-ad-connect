import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { TechTalkItem } from '../models/tech-talk-item';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable({
    providedIn: 'root'
})
export class TechTalkService extends BaseService {
    constructor(private _paramHttpClient: HttpClient,
        private _adalService: MsAdalAngular6Service) {
        super(_paramHttpClient, _adalService);
    }

    getTechTalkItems()
        : Observable<any> {
        const targetURL = `${environment.apiUrl}/api/TechTalk`;
        return this.getAndObserve(targetURL);
    }

    addNewTechTalkItem(item: TechTalkItem)
        : Observable<any> {
        const targetURL = `${environment.apiUrl}/api/TechTalk`;
        return this.postAndObserve(targetURL, item);
    }

}
