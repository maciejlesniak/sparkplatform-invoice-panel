import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/mergeMap'
import {environment} from '../../../environments/environment';

@Injectable()
export class HttpRequestServiceService {

  constructor(private http: HttpClient) {
  }

  public httpGet<T>(url: string): Observable<T> {
    console.debug('secured GET HTTP request to url: ', url);
    return HttpRequestServiceService.prepareHeaders('application/json')
      .mergeMap((currentHeaders: HttpHeaders) =>
        this.http.get<T>(url, {headers: currentHeaders}));
  }

  public httpPost<T>(url: string, payload: string): Observable<T> {
    console.debug('secured POST HTTP request...', url, payload);
    return HttpRequestServiceService.prepareHeaders('application/json')
      .mergeMap((currentHeaders: HttpHeaders) =>
        this.http.post<T>(url, payload, {headers: currentHeaders}));
  }

  public httpDelete<T>(url: string): Observable<T> {
    console.debug('secured DELETE HTTP request...', url);
    return HttpRequestServiceService.prepareHeaders('application/json')
      .mergeMap((currentHeaders: HttpHeaders) =>
        this.http.delete<T>(url, {headers: currentHeaders}));
  }

  public httpPut<T>(url: string, payload: string): Observable<T> {
    console.debug('secured PUT HTTP request...', url, payload);
    return HttpRequestServiceService.prepareHeaders('application/json')
      .mergeMap((currentHeaders: HttpHeaders) =>
        this.http.put<T>(url, payload, {headers: currentHeaders}));
  }

  private static prepareHeaders(contentType: string,
                                accessToken?: string): Observable<HttpHeaders | any> {
    console.debug('preparing headers from', contentType, accessToken);

    let headers = new HttpHeaders()
      .set('Content-Type', contentType)
      .set('Authorization', environment.DEFAULT_USER_AUTHORIZATION_HEADER);

    return Observable.of(headers);
  }

}
