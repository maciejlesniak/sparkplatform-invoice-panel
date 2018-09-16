import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Payment} from "../../../../dto/invoice";
import {BankAccount} from "../../../../dto/bank-account";

@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment.component.html',
  styleUrls: ['./invoice-payment.component.css']
})
export class InvoicePaymentComponent implements OnInit {

  @Output() public onPaymentUpdate: EventEmitter<Payment> = new EventEmitter<Payment>();
  @Input() public initialPayment: Payment;
  @Input() public issuerAccounts: EventEmitter<BankAccount[]>;

  public way = PAYMENT_WAY;
  public dueDate: Date = new Date();
  public selectedOption: PAYMENT_WAY;
  public selectedIssuerAccounts: BankAccount[];
  public selectedAccount: string;


  constructor() {
    this.selectedOption = undefined;
  }

  ngOnInit() {
    console.debug('initial payment way', this.initialPayment);

    this.dueDate = this.initialPayment.dueDate;
    this.selectedOption = InvoicePaymentComponent.stringToPaymentWay(this.initialPayment.way);

    if (this.issuerAccounts !== undefined) {
      this.issuerAccounts.subscribe(next => {
        console.log('initial issuer accounts', next);
        this.selectedIssuerAccounts = next;
        this.selectedAccount = this.selectedIssuerAccounts[0].baseNumber;
        this.onChangePayment();
      });
    }

  }

  public onChangePayment(): void {

    console.debug(
      'payment changed with account (if supported by payment)',
      InvoicePaymentComponent.paymentWayToString(this.selectedOption),
      this.selectedAccount);

    this.onPaymentUpdate.emit(
      new Payment(
        InvoicePaymentComponent.paymentWayToString(this.selectedOption),
        this.dueDate,
        this.selectedOption == PAYMENT_WAY.BANK_TRANSFER ? this.selectedAccount : undefined
      )
    );

  }

  private static stringToPaymentWay(str: string): PAYMENT_WAY {
    switch (str) {
      case 'cash':
        return PAYMENT_WAY.CASH;
      case 'bank_transfer':
        return PAYMENT_WAY.BANK_TRANSFER;
    }
  }

  private static paymentWayToString(way: PAYMENT_WAY): string {
    if (way == PAYMENT_WAY.CASH) {
      return 'cash';
    } else if (way == PAYMENT_WAY.BANK_TRANSFER) {
      return 'bank_transfer';
    }
  }

}

export enum PAYMENT_WAY {
  BANK_TRANSFER, CASH
}
