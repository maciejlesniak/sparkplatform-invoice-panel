import {Injectable} from '@angular/core';
import {HttpRequestServiceService} from "../auth/http-request.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {BusinessObjectResponse, CompanyRequest, CompanyResponse} from "../../dto/com-dtos";
import {Company} from "../../dto/company";
import {BusinessObjectsCommunicationService} from "./business-objects-communication.service";
import {CompaniesConverterService} from "../converters/companies-converter.service";

@Injectable()
export class ContractorsCommunicationService {

  constructor(private requestService: HttpRequestServiceService,
              private com: BusinessObjectsCommunicationService) {
  }

  public findAllContractors(): Observable<BusinessObjectResponse[]> {
    return this.requestService
      .httpGet<BusinessObjectResponse[]>(environment.HOST + '/contractors');
  }

  public saveContractor(company: Company): Observable<CompanyResponse> {
    return Observable.of(company)
      .map((company: Company) => CompaniesConverterService.companyToCompanyRequest(company))
      .flatMap((request: CompanyRequest) => this.requestService.httpPost<CompanyResponse>(environment.HOST + '/contractor', JSON.stringify(request)))
  }

  public updateContractor(companyId: string, company: Company): Observable<CompanyResponse> {
    return this.requestService
      .httpPut<CompanyResponse>(
        environment.HOST + '/contractor/' + companyId,
        JSON.stringify(CompaniesConverterService.companyToCompanyRequest(company)));
  }

  public findContractorById(contractorId: string): Observable<CompanyResponse> {
    return this.com.findBusinessObjectById(contractorId)
      .map((value: BusinessObjectResponse) => CompaniesConverterService.businessObjectResponseToCompanyResponse(value))
  }

}
