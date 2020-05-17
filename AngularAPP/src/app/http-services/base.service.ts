import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';


export class BaseService {
    options: Object;
    serviceBaseUrl: string;
    azureAdApiBaseUrl: string;
    private httpClient: HttpClient;
    private adalService: MsAdalAngular6Service;

    constructor(private paramHttpClient: HttpClient = null,
        private paramAdalService: MsAdalAngular6Service = null) {
        console.log('Inside BaseService constructor');
        this.httpClient = paramHttpClient;
        this.adalService = paramAdalService;

    }

    getAndObserve<T>(url: string): Observable<T> {
        console.log('Inside getAndObserve<T>(url: string): ' + url);

        return this.httpClient.get<T>(url, { observe: 'response' })
            .pipe(catchError(this.handleError2(url, []))
            );
    }

    postAndObserve<T>(url: string, data: any): Observable<T> {
        console.log('Inside postAndObserve<T>(url: string, data: any): ' + url);

        return this.httpClient.post<T>(url, data, { observe: 'response' })
            .pipe(catchError(this.handleError2(url, [])));
    }

    putAndObserve<T>(url: string, data: any): Observable<T> {
        console.log('Inside putAndObserve<T>(url: string, data: any): ' + url);
        console.log(data, ': Data');

        return this.httpClient.put<T>(url, data, { observe: 'response' })
            .pipe(catchError(this.handleError2(url, [])));
    }

    get<T>(url: string): Observable<T> {
        console.log('Inside get<T>(url: string): ' + url);
        const httpOptions = {
            headers: new HttpHeaders({ 'authorization': `Bearer ${this.adalService.accessToken}` })
        };

        return this.httpClient.get<T>(url, httpOptions)
            .pipe(catchError(this.handleError2(url, []))
            );
    }

    post<T>(url: string, data: any): Observable<T> {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': `Bearer ${this.adalService.accessToken}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
                'Access-Control-Allow-Headers':
                    '*,Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control'
            })
        };
        return this.httpClient.post<T>(url, data, httpOptions)
            .pipe(catchError(this.handleError2(url, []))
            );
    }

    put<T>(url: string, data: any): Observable<T> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
                'Access-Control-Allow-Headers':
                    '*,Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control'
            })
        };

        return this.httpClient.put<T>(url, data, httpOptions)
            .pipe(catchError(this.handleError2()));
    }

    delete<T>(url): Observable<T> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
                'Access-Control-Allow-Headers':
                    '*,Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control'
            })
        };

        return this.httpClient.delete(url, httpOptions)
            .pipe(catchError(this.handleError2(url, [])));
    }


    protected handleError1(error: HttpErrorResponse) {
        return Observable.throw(error.message);
    }

    protected handleError2<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<any> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            return Observable.throw(`Error: statusCode ${error.status} ${error.statusText}, ${error.error}, ${error.message}`);
            // Let the app keep running by returning an empty result.
            // return of(result as T);
        };
    }

}
