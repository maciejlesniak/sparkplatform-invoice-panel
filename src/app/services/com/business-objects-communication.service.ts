import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";
import {BusinessObjectResponse} from "../../dto/com-dtos";
import {HttpRequestServiceService} from "../auth/http-request.service";

@Injectable()
export class BusinessObjectsCommunicationService {

  constructor(private requestService: HttpRequestServiceService) {
  }


  public findBusinessObjectById(id: string): Observable<BusinessObjectResponse> {
    return this.requestService
      .httpGet<BusinessObjectResponse>(environment.HOST + '/bobj/' + id);
  }

  public deleteBusinessObjectById(id: string): Observable<any> {
    return this.requestService
      .httpDelete<any>(environment.HOST + '/bobj/' + id);
  }

}
