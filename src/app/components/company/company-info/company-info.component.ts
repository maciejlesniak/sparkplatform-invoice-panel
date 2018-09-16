import {Component, Input, OnInit} from '@angular/core';
import {BusinessObjectResponse} from "../../../dto/com-dtos";
import {BusinessObjectsCommunicationService} from "../../../services/com/business-objects-communication.service";
import {TaxOffice} from "../../../dto/tax-office";
import {TaxOfficesCommunicationService} from "../../../services/com/tax-offices-communication.service";

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  @Input() public companyId: string;
  @Input() public group: string;

  public company: BusinessObjectResponse;
  public taxOffice: TaxOffice;

  constructor(private businessObjectsCom: BusinessObjectsCommunicationService,
              private taxOfficesCom: TaxOfficesCommunicationService) {
  }

  ngOnInit() {

    this.businessObjectsCom
      .findBusinessObjectById(this.companyId)
      .subscribe(
        bobj => {
          this.company = bobj;
          this.taxOfficesCom.getTaxOfficeById(bobj.tax_office_id)
            .subscribe(
              toffice => this.taxOffice = toffice,
              err => console.error('error while fetching tax office data', err)
            )
        },
        err => console.error('error while fetching issuer data', err)
      );

  }



}
