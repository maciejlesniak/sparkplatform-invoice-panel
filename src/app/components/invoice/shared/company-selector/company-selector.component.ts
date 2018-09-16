import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from "../../../../dto/company";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-company-selector',
  templateUrl: './company-selector.component.html',
  styleUrls: ['./company-selector.component.css']
})
export class CompanySelectorComponent implements OnInit {

  @Input() public title: string;
  @Input() public initialCompaniesObservable: Observable<Company[]>;
  @Output() public onChoseCompany: EventEmitter<Company> = new EventEmitter<Company>();

  public initialCompanies: Company[];
  public selectedCompanyId: string = 'none';
  public chosenCompany: Company;

  constructor() {
  }

  ngOnInit() {
    if (this.initialCompaniesObservable) {
      this.initialCompaniesObservable.subscribe(
        companies => {
          console.debug('init with companies:', companies);
          this.initialCompanies = companies;

          if (companies.length === 1) {
            this.chosenCompany = this.initialCompanies[0];
            this.selectedCompanyId = this.chosenCompany.id;
            this.onChoseCompany.emit(this.chosenCompany);
          }
        },
        err => console.error('error while fetching all companies', err)
      );
    }
  }

  public onSelectCompany(evt: string) {
    console.debug('selected new company', evt);
    const filteredCompanies: Company[] = this.initialCompanies.filter(value => value.id === this.selectedCompanyId);
    if (filteredCompanies.length > 0) {
      this.chosenCompany = filteredCompanies[0];
    } else {
      this.chosenCompany = Company.empty();
    }

    this.onChoseCompany.emit(this.chosenCompany);
  }

}
