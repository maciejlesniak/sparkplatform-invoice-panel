import {Component, Input, OnInit} from '@angular/core';
import {InvoiceRecordResponse, InvoiceResponse} from "../../../../dto/com-dtos";
import {VatMapRecord} from "../invoice-view/invoice-view.component";

@Component({
  selector: 'app-invoice-regular-view',
  templateUrl: './invoice-regular-view.component.html',
  styleUrls: ['./invoice-regular-view.component.css']
})
export class InvoiceRegularViewComponent implements OnInit {

  @Input() public invoiceInput: InvoiceResponse;
  @Input() public invoiceNumberCaption: string = null;

  constructor() {
  }

  ngOnInit() {
  }

  public countNettTotal(): number {
    return this.invoiceInput.records
      .map((record: InvoiceRecordResponse) => record.qty * record.unit_price)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  public countGrossTotal(): number {
    return this.invoiceInput.records
      .map((record: InvoiceRecordResponse) => record.qty * record.unit_price * (1 + record.tax))
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  public countVatTotal(): number {
    return this.invoiceInput.records
      .map((record: InvoiceRecordResponse) => record.qty * record.unit_price * record.tax)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  public countNettValue(i: number): number {
    return this.invoiceInput.records[i].qty * this.invoiceInput.records[i].unit_price;
  }

  public countGrossValue(i: number): number {
    return this.invoiceInput.records[i].qty * this.invoiceInput.records[i].unit_price * (1 + this.invoiceInput.records[i].tax);
  }

  public countTax(i): number {
    return this.countGrossValue(i) - this.countNettValue(i);
  }

  public mapVatTotalValues(): VatMapRecord[] {
    const calc = (record: InvoiceRecordResponse) => record.tax * record.qty * record.unit_price;
    const sameTaxes = record => (value => value.tax === record.tax);
    let vatRecords: VatMapRecord[] = [];

    this.invoiceInput.records
      .forEach((record: InvoiceRecordResponse) => {
        let foundRecord: VatMapRecord = vatRecords.find(sameTaxes(record));
        if (foundRecord !== undefined) {
          foundRecord.taxTotalValue += calc(record);
        } else {
          vatRecords.push({tax: record.tax, taxTotalValue: calc(record)})
        }
      });

    return vatRecords;
  }

}
