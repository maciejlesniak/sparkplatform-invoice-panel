import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceCommunicationService} from "../../../../services/com/invoice-communication.service";
import {BusinessObjectResponse, InvoiceResponse, NewInvoiceCorrectionResponse} from "../../../../dto/com-dtos";
import {Invoice, InvoiceRecord, Payment} from "../../../../dto/invoice";
import {SequencersCommunicationService} from "../../../../services/com/sequencers-communication.service";
import {Company} from "../../../../dto/company";
import {Observable} from "rxjs/Observable";
import {ContractorsCommunicationService} from "../../../../services/com/contractors-communication.service";
import {IssuersCommunicationService} from "../../../../services/com/issuers-communication.service";
import {CompaniesConverterService} from "../../../../services/converters/companies-converter.service";
import {BankAccount} from "../../../../dto/bank-account";

@Component({
  selector: 'app-invoice-correction-editor',
  templateUrl: './invoice-correction-editor.component.html',
  styleUrls: ['./invoice-correction-editor.component.css']
})
export class InvoiceCorrectionEditorComponent implements OnInit {

  public baseInvoiceId: string;
  public baseInvoice: Invoice;
  public correctedInvoice: Invoice;

  public inputCorrectionInvoiceId: string;
  public correctionDate: Date;
  public listOfContractors: Observable<Company[]>;
  public listOfIssuers: Observable<Company[]>;

  public chosenIssuer: Company;
  public chosenContractor: Company;

  public issuerAccountsListChange: EventEmitter<BankAccount[]>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private invoiceCom: InvoiceCommunicationService,
              private sequencersCommunicationService: SequencersCommunicationService,
              private contractorsCommunicationService: ContractorsCommunicationService,
              private issuersCommunicationService: IssuersCommunicationService) {

    this.issuerAccountsListChange = new EventEmitter<BankAccount[]>();
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.baseInvoiceId = params['invoiceId'];
        this.getInvoiceInfo(this.baseInvoiceId);
      });

    this.listOfContractors = this.getListOfContractorCompanies();
    this.listOfIssuers = this.getListOfIssuerCompanies();
    this.correctionDate = new Date();
  }

  public onSubmit(): void {
    this.invoiceCom
      .saveInvoiceCorrection(
        this.baseInvoiceId,
        this.correctionDate,
        this.inputCorrectionInvoiceId,
        this.correctedInvoice)
      .subscribe(
        (value: NewInvoiceCorrectionResponse) => {
          console.debug('saved corrected invoice with response', value);
          this.router.navigateByUrl('/documents/invoices');
        },
        err => console.debug('there was a problem with saving correction invoice', this.inputCorrectionInvoiceId, this.correctedInvoice, err))
  }

  public onUpdateNote(note: string): void {
    console.debug('note has been just updated', note);
    this.correctedInvoice.note = note;
  }

  public onPaymentUpdate(payment: Payment): void {
    console.debug('payment has been just updated', payment);
    this.correctedInvoice.payment = payment;
  }

  public onInvoiceRecordsChange(records: InvoiceRecord[]): void {
    console.debug('invoice records has been just updated', records);
    this.correctedInvoice.invoiceRecords = records;
  }

  public onChoseContractor(contractor: Company): void {
    console.debug('contractor has been just updated', contractor);
    this.chosenContractor = contractor;
    this.correctedInvoice.contractor = contractor;
  }

  public onChoseIssuer(issuer: Company): void {
    this.chosenIssuer = issuer;
    this.correctedInvoice.issuer = issuer;
    console.log('chosen issuer', issuer);
    this.issuerAccountsListChange.emit(issuer.accounts);
    this.setupPredictedNextInvoiceCorrectionNumber(this.chosenIssuer.id);
  }

  public onSellDateChange(sellDate: Date): void {
    console.debug('sell date has been just updated', sellDate);
    this.correctedInvoice.sellDate = sellDate;
  }

  public onCreationDateChange(creationDate: Date): void {
    console.debug('creation date has been just updated', creationDate);
    this.correctedInvoice.creationDate = creationDate;
  }

  public onCorrectionDateChange(correctionDate: Date): void {
    console.debug('correction date has been just updated', correctionDate);
    this.correctionDate = correctionDate;
  }

  private getInvoiceInfo(docId: string): void {
    this.invoiceCom.getInvoiceByDocId(docId)
      .map((value: InvoiceResponse) => this.invoiceCom.toInvoice(value))
      .subscribe(
        invoiceInfo => {
          this.baseInvoice = invoiceInfo;
          this.correctedInvoice = this.deepCopy(this.baseInvoice);
        }
      )
  }

  public setupPredictedNextInvoiceCorrectionNumber(issuerId: string): void {
    this.sequencersCommunicationService.getNextCorrectionInvoiceNumber(issuerId)
      .map(value => value.number)
      .subscribe(
        value => this.inputCorrectionInvoiceId = value,
        err => console.error('Cannot fetch predicted next invoice correction number', err)
      )
  }

  public getListOfContractorCompanies(): Observable<Company[]> {
    return this.contractorsCommunicationService.findAllContractors()
      .map((response: BusinessObjectResponse[]) => response.map(value => CompaniesConverterService.businessObjectResponseToCompanyConverter(value)));
  }

  public getListOfIssuerCompanies(): Observable<Company[]> {
    return this.issuersCommunicationService.findAllIssuers()
      .map((response: BusinessObjectResponse[]) => response.map(value => CompaniesConverterService.businessObjectResponseToCompanyConverter(value)));
  }

  private deepCopy(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

}
