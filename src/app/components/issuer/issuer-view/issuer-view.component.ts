import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-issuer-view',
  templateUrl: './issuer-view.component.html',
  styleUrls: ['./issuer-view.component.css']
})
export class IssuerViewComponent implements OnInit {

  public companyId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _location: Location) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => this.companyId = params['businessObjectId']);
  }

  public onCancel() {
    this._location.back();
  }

}
