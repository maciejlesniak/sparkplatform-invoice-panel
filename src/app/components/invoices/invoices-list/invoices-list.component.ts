import {Component, OnInit} from '@angular/core';
import {InvoicesListElement} from "../../../dto/lists";
import {InvoicesCommunicationService} from "../../../services/com/invoices-communication.service";
import {Observable} from "rxjs/Observable";
import {InvoiceCommunicationService} from "../../../services/com/invoice-communication.service";
import {reduce, tap} from "rxjs/operators";

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit {

  public invoices: InvoicesListElement[];
  public baseInvoices: { [key: string]: InvoicesListElement; };

  constructor(private com: InvoicesCommunicationService,
              private comInvoice: InvoiceCommunicationService) {
    this.invoices = null;
    this.baseInvoices = {};
  }

  ngOnInit() {
    this.findAllInvoices();
  }

  public findAllInvoices(): void {
    this.com.findAllInvoices()
      .flatMap((allInvoices: InvoicesListElement[]) => {
          if (allInvoices.length > 0) {
            let correctedInvoices = allInvoices.filter((inv: InvoicesListElement) => inv.baseInvoiceObjId !== null);

            if (correctedInvoices.length > 0) {
              return Observable.from<InvoicesListElement>(correctedInvoices)
                .flatMap((inv: InvoicesListElement) => {
                  console.debug('got corrected invoice ', inv);
                  return this.comInvoice.getInvoiceByDocId(inv.baseInvoiceObjId)
                })
                .map(value => InvoicesCommunicationService.toInvoicesListElementConverter(value))
                .map(value => [value])
                .pipe(
                  tap(inv => console.debug('invoice concat ', inv)),
                  reduce((acc, value) => acc.concat(value))
                )
                .map((reduced: InvoicesListElement[]) => new Pair(allInvoices, reduced));
            } else {
              return Observable.of(new Pair(allInvoices, []));
            }
          } else {
            return Observable.of(new Pair(allInvoices, []));
          }
        }
      )
      .subscribe(
        (pair: Pair) => {

          this.invoices = pair.first;

          if(pair.second.length > 0) {
            pair.second.forEach(value => this.baseInvoices[value.objId] = value);
          }

          console.debug('got all invoices', this.invoices);
          console.debug('got all base invoices', this.baseInvoices);
        },
        err => console.error('error while fetching all invoices', err)
      )
    ;
  }

  public onDelete(id: string): void {
    this.com.deleteInvoice(id)
      .subscribe(
        ok => {
          console.debug('deleted invoice', ok);
          this.findAllInvoices();
        },
        err => console.error('error while deleting invoice', err));
  }

}


class Pair {
  public first: InvoicesListElement[];
  public second: InvoicesListElement[];

  constructor(first: InvoicesListElement[], second: InvoicesListElement[]) {
    this.first = first;
    this.second = second;
  }
}
