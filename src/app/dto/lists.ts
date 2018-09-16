export class CompanyListElement {
  id: string;
  shortName: string;
  nip: string;
  city: string;
}

export class InvoicesListElement {
  objId: string;
  invoiceBaseId: string;
  date: Date;
  contractor: { name: string; nip: string; };
  totalNettVal: number;
  currencySymbol: string;
  subjects: string[];
  lock: string;
  baseInvoiceObjId: string;
  correctionInvoiceObjId: string;
}
