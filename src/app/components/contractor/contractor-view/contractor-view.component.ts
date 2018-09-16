import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-contractor-view',
  templateUrl: './contractor-view.component.html',
  styleUrls: ['./contractor-view.component.css']
})
export class ContractorViewComponent implements OnInit {
  public companyId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _location: Location) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => this.companyId = params['businessObjectId']);
  }

  public onCancel() {
    this._location.back();
  }

}
