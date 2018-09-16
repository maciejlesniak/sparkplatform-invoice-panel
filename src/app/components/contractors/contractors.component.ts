import {Component, OnInit} from '@angular/core';
import {ContractorsCommunicationService} from "../../services/com/contractors-communication.service";
import {CompanyListElement} from "../../dto/lists";
import {BusinessObjectResponse} from "../../dto/com-dtos";
import {BusinessObjectsCommunicationService} from "../../services/com/business-objects-communication.service";

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit {

  public contractors: CompanyListElement[];

  constructor(private contractorsCom: ContractorsCommunicationService,
              private objetcsCom: BusinessObjectsCommunicationService) {
  }

  ngOnInit() {
    this.findAllContractors();
  }

  public findAllContractors(): void {
    this.contractorsCom.findAllContractors()
      .map((response: BusinessObjectResponse[]) => {
        return response.map(oneContractorResponse => this.toListElementsConverter(oneContractorResponse));
      })
      .subscribe(
        allContractors => {
          console.debug('got all contractors', allContractors);
          this.contractors = allContractors;
        },
        err => console.error('error while fetching all contractors', err));
  }

  private toListElementsConverter(responseElement: BusinessObjectResponse): CompanyListElement {
    return {
      id: responseElement.id,
      city: responseElement.address.city,
      nip: responseElement.nip,
      shortName: responseElement.short_name
    }
  }

  public onUpdate(id: string) {

  }

  public onDelete(id: string) {
    this.objetcsCom.deleteBusinessObjectById(id)
      .subscribe(
        ok => {
          console.debug('deleted contractor', id);
          this.findAllContractors();
        },
        err => console.error('error while deleting contractor id:', id, err));
  }
}
