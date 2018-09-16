import {Company} from "./company";

export class Invoice {

  public invoiceId: string;
  public issuer: Company;
  public contractor: Company;
  public invoiceRecords: InvoiceRecord[];
  public sellDate: Date;
  public creationDate: Date;
  public payment: Payment;
  public note: string;


  constructor(invoiceId: string,
              sellDate: Date,
              creationDate: Date,
              issuer: Company,
              contractor: Company,
              invoiceRecords: InvoiceRecord[],
              payment: Payment,
              note: string) {
    this.invoiceId = invoiceId;
    this.sellDate = sellDate;
    this.creationDate = creationDate;
    this.issuer = issuer;
    this.contractor = contractor;
    this.invoiceRecords = invoiceRecords;
    this.payment = payment;
    this.note = note;
  }
}

export class InvoiceRecord {
  subject: string;
  qty: number;
  units: string;
  unitPriceNett: number;
  vat: string;
  currencySign: string;

  constructor(subject: string,
              qty: number,
              units: string,
              unitPriceNett: number,
              vat: string,
              currency: string) {
    this.subject = subject;
    this.qty = qty;
    this.units = units;
    this.unitPriceNett = unitPriceNett;
    this.vat = vat;
    this.currencySign = currency;
  }

  public static empty(): InvoiceRecord {
    return new InvoiceRecord('', 1, '', 0, '', 'PLN');
  }

  public static copy(record: InvoiceRecord): InvoiceRecord {
    return new InvoiceRecord(record.subject, record.qty, record.units, record.unitPriceNett, record.vat, record.currencySign);
  }
}


export class Payment {

  public way: string;
  public dueDate: Date;
  public bankAccountNumber?: string;

  constructor(way: string, dueDate: Date, bankAccountNumber?: string) {
    this.way = way;
    this.dueDate = dueDate;
    this.bankAccountNumber = bankAccountNumber;
  }
}
