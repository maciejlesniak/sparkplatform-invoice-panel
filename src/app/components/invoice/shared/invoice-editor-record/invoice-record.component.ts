import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceRecord} from "../../../../dto/invoice";
import {DecimalPipe} from "@angular/common";
import {SettingsService} from "../../../../services/settings/settings.service";
import {MeasurmentUnit} from "../../../../dto/measurment-unit";
import {VatRate} from "../../../../dto/vat-rate";

@Component({
  selector: 'app-invoice-record',
  templateUrl: './invoice-record.component.html',
  styleUrls: ['./invoice-record.component.css'],
  providers: [
    DecimalPipe,
  ]
})
export class InvoiceRecordComponent implements OnInit {

  public subject: string;
  public qty: number;
  public units: string;
  public unitPriceNett: number;
  public vat: string;
  public currencySign: string;

  public availableUnits: MeasurmentUnit[];
  public availableVatRates: VatRate[];

  @Input() public no: number;
  @Input() public initRecord: InvoiceRecord;
  @Output() public onRecordChange: EventEmitter<InvoiceRecord> = new EventEmitter<InvoiceRecord>();

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    if (this.initRecord === undefined) {
      this.initRecord = InvoiceRecord.empty();
    }
    console.debug('init with invoice record ', this.initRecord);
    this.subject = this.initRecord.subject;
    this.qty = this.initRecord.qty;
    this.units = this.initRecord.units;
    this.unitPriceNett = this.initRecord.unitPriceNett;
    this.vat = this.initRecord.vat;
    this.currencySign = this.initRecord.currencySign;

    this.availableUnits = this.settingsService.getMeasurementUnits();
    this.availableVatRates = this.settingsService.getVatRates();
  }

  public emitChange() {
    console.debug('record changed to', this.initRecord);
    this.onRecordChange.emit(
      new InvoiceRecord(this.subject, this.qty, this.units, this.unitPriceNett, this.vat, this.currencySign));
  }

  public computeNettTotalPrice(nettUnitPrice: number, qty: number): number {
    return nettUnitPrice * qty;
  }

  public computeGrossTotalPrice(nettUnitPrice: number, qty: number, vatRateId: string): number {
    return vatRateId !== '' ? nettUnitPrice * qty * (1 + this.settingsService.vatRateIdToRate(vatRateId)) : 0;
  }

}
