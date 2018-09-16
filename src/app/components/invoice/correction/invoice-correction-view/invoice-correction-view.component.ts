import {Component, Input, OnInit} from '@angular/core';
import {InvoiceResponse} from "../../../../dto/com-dtos";

@Component({
  selector: 'app-invoice-correction-view',
  templateUrl: './invoice-correction-view.component.html',
  styleUrls: ['./invoice-correction-view.component.css']
})
export class InvoiceCorrectionViewComponent implements OnInit {

  @Input() public oldInvoice: InvoiceResponse;
  @Input() public newInvoice: InvoiceResponse;
  @Input() public correctionNumber: string;
  @Input() public correctionDate: Date;

  constructor() { }

  ngOnInit() {
  }

}
