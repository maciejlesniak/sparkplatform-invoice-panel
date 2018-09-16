import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Company} from "../../../dto/company";
import {ContractorsCommunicationService} from "../../../services/com/contractors-communication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {CompaniesConverterService} from "../../../services/converters/companies-converter.service";

@Component({
  selector: 'app-contractor-update',
  templateUrl: './contractor-update.component.html',
  styleUrls: ['./contractor-update.component.css']
})
export class ContractorUpdateComponent implements OnInit {

  public companyId: string;
  public contractor: Observable<Company>;
  public contractorName: string;

  constructor(private com: ContractorsCommunicationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => this.companyId = params['businessObjectId']);

    this.contractor = this.findContractorById(this.companyId)
      .pipe(
        tap(value =>
          this.contractorName = value.company_full_name)
      );
  }

  public onSubmit(evt: Company) {
    this.com.updateContractor(this.companyId, evt)
      .subscribe(updatedCompany => {
          console.debug('updated company', updatedCompany);
          this.router.navigateByUrl('/contractors');
        },
        err => console.error('error while updating company', err))
  }

  private findContractorById(contractorId: string): Observable<Company> {
    return this.com
      .findContractorById(contractorId)
      .map(value => CompaniesConverterService.companyResponseToCompany(value));
  }

}
