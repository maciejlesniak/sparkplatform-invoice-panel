import {Component, Input, OnInit} from '@angular/core';
import {BankAccount} from "../../../dto/bank-account";

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.css']
})
export class AccountEditorComponent implements OnInit {

  @Input() public account: BankAccount;
  @Input() public index: number;
  @Input() public readOnly: boolean;

  constructor() { }

  ngOnInit() {
  }

}
