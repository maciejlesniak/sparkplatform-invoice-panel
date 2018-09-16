import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {TaxOffice} from "../../dto/tax-office";
import {HttpRequestServiceService} from "../auth/http-request.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class TaxOfficesCommunicationService {

  constructor(private requestService: HttpRequestServiceService) {
  }

  public getAllTaxOffices(): Observable<TaxOffice[]> {
    return this.requestService.httpGet<TaxOffice[]>(environment.HOST + '/taxoffices')
  }

  public getTaxOfficeById(id: string): Observable<TaxOffice> {
    return this.requestService.httpGet<TaxOffice>(environment.HOST + '/taxoffice/' + id)
  }


}
