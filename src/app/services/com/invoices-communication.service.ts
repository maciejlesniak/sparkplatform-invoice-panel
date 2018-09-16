import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {HttpRequestServiceService} from "../auth/http-request.service";
import {environment} from "../../../environments/environment";
import {InvoicesListElement} from "../../dto/lists";
import {InvoiceResponse} from "../../dto/com-dtos";

@Injectable()
export class InvoicesCommunicationService {

  constructor(private requestService: HttpRequestServiceService) {
  }

  public findAllInvoices(): Observable<InvoicesListElement[]> {
    return this.requestService
      .httpGet<InvoiceResponse[]>(environment.HOST + '/invoices')
      .map((response: InvoiceResponse[]) => {
        return response.map(oneInvoiceResponse => InvoicesCommunicationService.toInvoicesListElementConverter(oneInvoiceResponse));
      })
  }

  public deleteInvoice(invoiceId: string): Observable<any> {
    return this.requestService
      .httpDelete(environment.HOST + '/invoice/' + invoiceId)
  }

  public static toInvoicesListElementConverter(responseElement: InvoiceResponse): InvoicesListElement {
    return {
      objId: responseElement.doc_id,
      invoiceBaseId: responseElement.base_number,
      date: responseElement.created,
      contractor: {
        nip: responseElement.contractor.nip,
        name: responseElement.contractor.full_name
      },
      currencySymbol: responseElement.records[0].currency_symbol,
      totalNettVal: responseElement.records
        .map((value) => value.qty * value.unit_price)
        .reduce((previousValue, currentValue) => previousValue + currentValue),
      subjects: responseElement.records.map(record => record.subject),
      lock: responseElement.metadata_status.lock_status,
      baseInvoiceObjId: responseElement.metadata_status.base_doc_id,
      correctionInvoiceObjId: responseElement.metadata_status.correction_doc_id
    }
  }

}
