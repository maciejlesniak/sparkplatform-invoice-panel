import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {HttpRequestServiceService} from "../auth/http-request.service";
import {BusinessObjectResponse, CompanyResponse} from "../../dto/com-dtos";
import {Company} from "../../dto/company";
import {BusinessObjectsCommunicationService} from "./business-objects-communication.service";
import {CompaniesConverterService} from "../converters/companies-converter.service";

@Injectable()
export class IssuersCommunicationService {

  constructor(private requestService: HttpRequestServiceService,
              private com: BusinessObjectsCommunicationService) {
  }

  public findAllIssuers(): Observable<BusinessObjectResponse[]> {
    return this.requestService
      .httpGet<BusinessObjectResponse[]>(environment.HOST + '/issuers');
  }

  public updateIssuer(companyId: string, company: Company): Observable<CompanyResponse> {
    return this.requestService
      .httpPut<CompanyResponse>(
        environment.HOST + '/issuer/' + companyId,
        JSON.stringify(CompaniesConverterService.companyToCompanyRequest(company)));
  }

  public findIssuerById(contractorId: string): Observable<CompanyResponse> {
    return this.com.findBusinessObjectById(contractorId)
      .map((value: BusinessObjectResponse) => CompaniesConverterService.businessObjectResponseToCompanyResponse(value))
  }

}
