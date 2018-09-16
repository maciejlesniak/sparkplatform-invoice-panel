import {Component, OnInit} from '@angular/core';
import {Company} from "../../../dto/company";
import {ContractorsCommunicationService} from "../../../services/com/contractors-communication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contractor-add',
  templateUrl: './contractor-add.component.html',
  styleUrls: ['./contractor-add.component.css']
})
export class ContractorAddComponent implements OnInit {

  constructor(private com: ContractorsCommunicationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public onSubmit(evt: Company) {
    this.com.saveContractor(evt)
      .subscribe(newCompany => {
          console.debug('saved new company', newCompany);
          this.router.navigateByUrl('/contractors');
        },
        err => console.error('error while saving new company', err))
  }

}
