import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from "../../../dto/company";
import {Router} from "@angular/router";
import {TaxOffice} from "../../../dto/tax-office";
import {TaxOfficesCommunicationService} from "../../../services/com/tax-offices-communication.service";
import {Observable} from "rxjs/Observable";
import {BankAccount} from "../../../dto/bank-account";

@Component({
  selector: 'app-company-editor',
  templateUrl: './company-editor.component.html',
  styleUrls: ['./company-editor.component.css']
})
export class CompanyEditorComponent implements OnInit {

  @Input() public initialCompany: Observable<Company>;
  @Input() public onCancelUrl: string;
  @Output() public submittedCompany: EventEmitter<Company> = new EventEmitter<Company>();

  public company: Company = Company.empty();
  public taxOffices: TaxOffice[];
  public companyAccounts: Observable<BankAccount[]>;

  constructor(private router: Router,
              private taxOfficesCommunicationService: TaxOfficesCommunicationService) {
    this.companyAccounts = Observable.of([]);
  }

  ngOnInit() {
    this.getAllTaxOffices();

    if (this.initialCompany !== undefined) {
      this.companyAccounts = this.initialCompany.map(value => value.accounts);
      this.initialCompany
        .subscribe(value => this.company = value);
    }

  }

  private getAllTaxOffices() {
    this.taxOfficesCommunicationService.getAllTaxOffices()
      .subscribe(value => this.taxOffices = value);
  }

  public updateAccounts(newAccountsList: BankAccount[]) {
    this.company.accounts = newAccountsList;
    console.log('updated accounts list', this.company.accounts);
  }

  public onSubmit(evt): void {
    this.submittedCompany.emit(this.company);
  }

  public onCancel() {
    console.debug('back to', this.onCancelUrl);
    this.router.navigateByUrl(this.onCancelUrl);
  }

}
