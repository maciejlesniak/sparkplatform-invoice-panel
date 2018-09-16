import {Component, OnInit} from '@angular/core';
import {CompanyListElement} from "../../../dto/lists";
import {IssuersCommunicationService} from "../../../services/com/issuers-communication.service";
import {BusinessObjectResponse} from "../../../dto/com-dtos";

@Component({
  selector: 'app-issuers-list',
  templateUrl: './issuers-list.component.html',
  styleUrls: ['./issuers-list.component.css']
})
export class IssuersListComponent implements OnInit {

  public issuers: CompanyListElement[];

  constructor(private com: IssuersCommunicationService) { }

  ngOnInit() {
    this.findAllIssuers()
  }

  public findAllIssuers(): void {
    this.com.findAllIssuers()
      .map((response: BusinessObjectResponse[]) => {
        return response.map(oneContractorResponse => this.toListElementsConverter(oneContractorResponse));
      })
      .subscribe(
        allIssuers => {
          console.debug('got all issuers', allIssuers);
          this.issuers = allIssuers;
        },
        err => console.error('error while fetching all issuers', err));
  }

  private toListElementsConverter(responseElement: BusinessObjectResponse): CompanyListElement {
    return {
      id: responseElement.id,
      city: responseElement.address.city,
      nip: responseElement.nip,
      shortName: responseElement.short_name
    }
  }

}
