import {Component, OnInit} from '@angular/core';
import {InvoiceCommunicationService} from '../../../../services/com/invoice-communication.service';
import {ActivatedRoute} from '@angular/router';
import {CorrectionDetailsResponse, InvoiceResponse} from '../../../../dto/com-dtos';

export class VatMapRecord {
  tax: number;
  taxTotalValue: number;
}

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {

  public invoice: InvoiceResponse;

  public correctionNumber: string;
  public correctionDate: Date;
  public newInvoice: InvoiceResponse;
  public oldInvoice: InvoiceResponse;

  constructor(private com: InvoiceCommunicationService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => this.getInvoiceInfo(params['invoiceId']));
  }

  private getInvoiceInfo(docId: string): void {
    this.com.getInvoiceByDocId(docId)
      .subscribe(
        invoiceInfo => {
          this.invoice = invoiceInfo;

          if (invoiceInfo.metadata_status.base_doc_id) {
            this.com.getCorrectionDetailsByDocId(docId)
              .subscribe((correctionInvoice: CorrectionDetailsResponse) => {

                this.correctionNumber = correctionInvoice.correction_number;
                this.correctionDate = correctionInvoice.correction_date;
                this.newInvoice = correctionInvoice.new_version;
                this.oldInvoice = correctionInvoice.old_version;

                console.debug('got correction invoice', this.correctionNumber, this.newInvoice, this.oldInvoice);
              });
          }
        }
      );
  }

}
