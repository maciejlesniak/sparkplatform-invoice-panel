import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BankAccount} from "../../../dto/bank-account";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-accounts-list-editor',
  templateUrl: './accounts-list-editor.component.html',
  styleUrls: ['./accounts-list-editor.component.css']
})
export class AccountsListEditorComponent implements OnInit {

  @Input() public initialAccounts: Observable<BankAccount[]>;
  @Output() public accountsListChange: EventEmitter<BankAccount[]> = new EventEmitter<BankAccount[]>();

  public accounts: BankAccount[];
  public newAccount: BankAccount;

  constructor() {
  }

  ngOnInit() {
    this.flush();

    if (this.initialAccounts !== undefined) {
      this.initialAccounts.subscribe(
        value => this.accounts = value,
        err => console.error('could not fetch bank accounts')
      );
    }

  }

  public delRecord(i: number) {
    this.accounts.splice(i, 1);
    this.accountsListChange.emit(this.accounts);
  }

  public addRecord() {

    const newAccount: BankAccount = {
      baseNumber: this.newAccount.baseNumber,
      name: this.newAccount.name,
      type: 'iban'
    };

    console.debug('adding new account to list of accounts', newAccount);
    this.accounts.push(newAccount);
    this.flush();
    this.accountsListChange.emit(this.accounts);
  }

  private flush() {
    this.newAccount = {
      baseNumber: '',
      name: '',
      type: ''
    };
  }

}
