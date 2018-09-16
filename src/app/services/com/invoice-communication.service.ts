import {Injectable} from '@angular/core';
import {HttpRequestServiceService} from "../auth/http-request.service";
import {environment} from "../../../environments/environment";
import {Invoice, InvoiceRecord, Payment} from "../../dto/invoice";
import {Observable} from "rxjs/Observable";
import {
  AddressDto,
  CompanyResponse,
  CorrectionDetailsResponse,
  InvoiceRecordRequest,
  InvoiceRecordResponse,
  InvoiceResponse,
  NewInvoiceCorrectionRequest,
  NewInvoiceCorrectionResponse,
  NewInvoiceRequest,
  RepresentationDto
} from "../../dto/com-dtos";
import {Company} from "../../dto/company";
import {TaxInfo} from "../../dto/tax-info";
import {Address} from "../../dto/address";
import {Representation} from "../../dto/representation";
import {SettingsService} from "../settings/settings.service";

@Injectable()
export class InvoiceCommunicationService {

  constructor(private requestService: HttpRequestServiceService,
              private settingsService: SettingsService) {
  }

  public saveInvoice(invoice: Invoice): Observable<Invoice> {
    return Observable.of(invoice)
      .map(invoice => this.toNewInvoiceRequest(invoice))
      .map(request => JSON.stringify(request))
      .flatMap(jsonRequest =>
        this.requestService.httpPost<Invoice>(environment.HOST + '/invoice', jsonRequest));
  }

  public saveInvoiceCorrection(baseInvoiceId: string,
                               correctionDate: Date,
                               correctionInvoiceId: string,
                               invoice: Invoice): Observable<NewInvoiceCorrectionResponse> {
    return Observable.of(invoice)
      .map(correctedInvoice => this.toNewInvoiceRequest(correctedInvoice))
      .map(correctedInvoiceRequest => {
        return {
          correction_invoice_number: correctionInvoiceId,
          correction_date: correctionDate,
          new_payload: correctedInvoiceRequest
        }
      })
      .map((request: NewInvoiceCorrectionRequest) => JSON.stringify(request))
      .flatMap(jsonRequest =>
        this.requestService.httpPost<NewInvoiceCorrectionResponse>(environment.HOST + '/invoice/' + baseInvoiceId + '/correction', jsonRequest));
  }

  public getInvoiceByDocId(docId: string): Observable<InvoiceResponse> {
    return this.requestService.httpGet<InvoiceResponse>(environment.HOST + '/invoice/' + docId)
  }

  public getCorrectionDetailsByDocId(docId: string): Observable<CorrectionDetailsResponse> {
    return this.requestService.httpGet<CorrectionDetailsResponse>(environment.HOST + '/correction/' + docId)
  }

  public toInvoice(invoiceResponse: InvoiceResponse): Invoice {
    return new Invoice(
      invoiceResponse.base_number,
      invoiceResponse.sold,
      invoiceResponse.created,
      this.toCompany(invoiceResponse.issuer),
      this.toCompany(invoiceResponse.contractor),
      invoiceResponse.records.map(recordResponse => this.toInvoiceRecord(recordResponse)),
      new Payment(invoiceResponse.payment_method, invoiceResponse.payment_due_date),
      invoiceResponse.note
    )
  }

  private toCompany(companyResponse: CompanyResponse): Company {
    return new Company(
      companyResponse.id,
      companyResponse.short_name,
      companyResponse.full_name,
      companyResponse.nip,
      companyResponse.regon,
      new TaxInfo(
        companyResponse.vat_payer,
        companyResponse.tax_office_id),
      this.toAddress(companyResponse.address),
      companyResponse.accounts,
      this.toRepresentation(companyResponse.coordinator));
  }

  private toRepresentation(dto: RepresentationDto): Representation {
    return new Representation(dto.last_name, dto.first_name, dto.second_name);
  }

  private toAddress(dto: AddressDto): Address {
    return new Address(dto.street, dto.house, dto.local, dto.city, dto.zip, dto.zip_city);
  }

  private toInvoiceRecord(record: InvoiceRecordResponse): InvoiceRecord {
    return new InvoiceRecord(
      record.subject,
      record.qty,
      record.units,
      record.unit_price,
      this.settingsService.vatRateToRateId(record.tax),
      record.currency_symbol
    );
  }

  private toNewInvoiceRequest(invoice: Invoice): NewInvoiceRequest {
    return {
      invoice_number: invoice.invoiceId,
      contractorId: invoice.contractor.id,
      created: invoice.creationDate,
      issuerId: invoice.issuer.id,
      payment_method: invoice.payment.way.toUpperCase(),
      payment_due_date: invoice.payment.dueDate,
      sold: invoice.sellDate,
      note: invoice.note ? invoice.note : '',
      records: invoice.invoiceRecords.map(record => this.toNewInvoiceRecord(record)),
      issuer_iban: invoice.payment.bankAccountNumber
    }
  }

  private toNewInvoiceRecord(invoiceRecord: InvoiceRecord): InvoiceRecordRequest {
    return {
      currency_symbol: invoiceRecord.currencySign,
      qty: invoiceRecord.qty,
      subject: invoiceRecord.subject,
      tax: this.settingsService.vatRateIdToRate(invoiceRecord.vat),
      unit_price: invoiceRecord.unitPriceNett,
      units: invoiceRecord.units
    };
  }


}
