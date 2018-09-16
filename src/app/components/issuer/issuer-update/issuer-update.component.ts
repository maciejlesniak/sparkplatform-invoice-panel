import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Company} from "../../../dto/company";
import {ActivatedRoute, Router} from "@angular/router";
import {IssuersCommunicationService} from "../../../services/com/issuers-communication.service";
import {tap} from "rxjs/operators";
import {CompaniesConverterService} from "../../../services/converters/companies-converter.service";

@Component({
  selector: 'app-issuer-update',
  templateUrl: './issuer-update.component.html',
  styleUrls: ['./issuer-update.component.css']
})
export class IssuerUpdateComponent implements OnInit {

  public companyId: string;
  public issuer: Observable<Company>;
  public issuerName: string;

  constructor(private com: IssuersCommunicationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => this.companyId = params['businessObjectId']);

    this.issuer = this.findIssuerById(this.companyId)
      .pipe(
        tap(value =>
          this.issuerName = value.company_full_name),
        tap(val => console.log(val))
      );
  }

  public onSubmit(evt: Company) {
    this.com.updateIssuer(this.companyId, evt)
      .subscribe(updatedCompany => {
          console.debug('updated company', updatedCompany);
          this.router.navigateByUrl('/identity');
        },
        err => console.error('error while updating company', err))
  }

  private findIssuerById(contractorId: string): Observable<Company> {
    return this.com
      .findIssuerById(contractorId)
      .map(value => CompaniesConverterService.companyResponseToCompany(value));
  }

}
