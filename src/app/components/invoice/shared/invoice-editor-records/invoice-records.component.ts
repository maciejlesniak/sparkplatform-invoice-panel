import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceRecord} from "../../../../dto/invoice";

@Component({
  selector: 'app-invoice-records',
  templateUrl: './invoice-records.component.html',
  styleUrls: ['./invoice-records.component.css'],
})
export class InvoiceRecordsComponent implements OnInit {

  @Input() public initialRecords: InvoiceRecord[];
  @Output() public invoiceRecordsChange: EventEmitter<InvoiceRecord[]> = new EventEmitter<InvoiceRecord[]>();

  public invoiceRecords: InvoiceRecord[];

  constructor() {
  }

  ngOnInit() {

    if(this.initialRecords !== undefined) {
      this.invoiceRecords = this.initialRecords;
    }

    if(this.invoiceRecords.length === 0) {
      this.invoiceRecords.push(InvoiceRecord.empty());
    }
    this.invoiceRecordsChange.emit(this.invoiceRecords);
  }

  public onRecordUp(index: number): void {
    if (index >= 1) {
      console.debug('on move up');
      const obj: InvoiceRecord = InvoiceRecord.copy(this.invoiceRecords[index]);
      this.invoiceRecords.splice(index, 1);
      this.invoiceRecords.splice(index - 1, 0, obj);
      this.invoiceRecordsChange.emit(this.invoiceRecords);
    }
  }

  public onRecordDown(index: number): void {
    if (index < this.invoiceRecords.length - 1) {
      console.debug('on move down');
      const obj: InvoiceRecord = InvoiceRecord.copy(this.invoiceRecords[index]);
      this.invoiceRecords.splice(index, 1);
      this.invoiceRecords.splice(index + 1, 0, obj);
      this.invoiceRecordsChange.emit(this.invoiceRecords);
    }
  }

  public addRecord(): void {
    this.invoiceRecords[this.invoiceRecords.length] = InvoiceRecord.empty();
      this.invoiceRecordsChange.emit(this.invoiceRecords);
  }

  public delRecord(index: number): void {
    this.invoiceRecords.splice(index, 1);
      this.invoiceRecordsChange.emit(this.invoiceRecords);
  }

  public onRecordChange(index: number, obj: InvoiceRecord):void {
    this.invoiceRecords[index] = obj;
      this.invoiceRecordsChange.emit(this.invoiceRecords);
  }

  public clearRecord(index: number):void {
    this.invoiceRecords[index] = InvoiceRecord.empty();
      this.invoiceRecordsChange.emit(this.invoiceRecords);
  }

}
