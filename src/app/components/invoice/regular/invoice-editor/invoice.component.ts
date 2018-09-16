import {Component, EventEmitter, OnInit} from '@angular/core';
import {Company} from "../../../../dto/company";
import {Invoice, InvoiceRecord, Payment} from "../../../../dto/invoice";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {InvoiceCommunicationService} from "../../../../services/com/invoice-communication.service";
import {ContractorsCommunicationService} from "../../../../services/com/contractors-communication.service";
import {IssuersCommunicationService} from "../../../../services/com/issuers-communication.service";
import {Observable} from "rxjs/Observable";
import {BusinessObjectResponse} from "../../../../dto/com-dtos";
import {SequencersCommunicationService} from "../../../../services/com/sequencers-communication.service";
import {CompaniesConverterService} from "../../../../services/converters/companies-converter.service";
import {BankAccount} from "../../../../dto/bank-account";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public initialInvoiceRecords: InvoiceRecord[];
  public initialNote: string;
  public initialPayment: Payment;

  public invoiceId: string;
  public issuer: Company;
  public contractor: Company;
  public creationDate: Date;
  public sellDate: Date;
  public invoiceRecords: InvoiceRecord[];
  public payment: Payment;
  public note: string;
  public listOfContractors: Observable<Company[]>;
  public listOfIssuers: Observable<Company[]>;
  public issuerAccountsChange: EventEmitter<BankAccount[]>;

  constructor(private router: Router,
              private _location: Location,
              private com: InvoiceCommunicationService,
              private contractorsCommunicationService: ContractorsCommunicationService,
              private issuersCommunicationService: IssuersCommunicationService,
              private sequencersCommunicationService: SequencersCommunicationService) {
    this.initialNote = '';
    this.initialPayment = new Payment('bank_transfer', new Date());
    this.initialInvoiceRecords = [];
    this.invoiceRecords = [];

    this.sellDate = new Date();
    this.creationDate = new Date();
    this.issuerAccountsChange = new EventEmitter<BankAccount[]>();
  }

  ngOnInit() {
    this.listOfContractors = this.getListOfContractorCompanies();
    this.listOfIssuers = this.getListOfIssuerCompanies();
  }

  public setupPredictedNextInvoiceNumber(issuerId: string): void {
    this.sequencersCommunicationService.getNextRegularInvoiceNumber(issuerId)
      .map(value => value.number)
      .subscribe(
        value => this.invoiceId = value,
        err => console.error('Cannot fetch predicted next invoice number', err)
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

  public onInvoiceRecordsChange(changed: InvoiceRecord[]): void {
    this.invoiceRecords = changed;
    console.debug('invoice records has changed to', this.invoiceRecords);
  }

  public onChoseIssuer(issuer: Company): void {
    this.issuer = issuer;
    console.log('chosen issuer', this.issuer);
    this.issuerAccountsChange.emit(this.issuer.accounts);
    this.setupPredictedNextInvoiceNumber(this.issuer.id);
  }

  public onChoseContractor(contractor: Company): void {
    this.contractor = contractor;
  }

  public onUpdateNote(note: string) {
    this.note = note;
  }

  public onPaymentUpdate(payment: Payment): void {
    this.payment = payment;
  }

  public onSubmit() {
    const inv: Invoice = new Invoice(
      this.invoiceId,
      this.sellDate,
      this.creationDate,
      this.issuer,
      this.contractor,
      this.invoiceRecords,
      this.payment,
      this.note);
    console.debug('submitted invoice with data', inv);
    this.com.saveInvoice(inv)
      .subscribe(savedInvoice => {
          console.debug('invoice saved', savedInvoice);
          this.router.navigateByUrl('/documents/invoices');
        },
        err => console.error('invoice saving error', err))
  }

  public onCancel() {
    this._location.back();
  }


}
