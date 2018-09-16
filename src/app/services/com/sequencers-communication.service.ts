import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpRequestServiceService} from "../auth/http-request.service";
import {environment} from "../../../environments/environment";
import {SequenceNumberResponse} from "../../dto/com-dtos";

@Injectable()
export class SequencersCommunicationService {

  constructor(private requestService: HttpRequestServiceService) {
  }

  public getNextRegularInvoiceNumber(issuerId: string): Observable<SequenceNumberResponse> {
    return this.requestService.httpGet<SequenceNumberResponse>(environment.HOST + '/issuer/' + issuerId + '/regular.invoice.number/next')
  }

  public getNextCorrectionInvoiceNumber(issuerId: string): Observable<SequenceNumberResponse> {
    return this.requestService.httpGet<SequenceNumberResponse>(environment.HOST + '/issuer/' + issuerId + '/correction.invoice.number/next')
  }



}
