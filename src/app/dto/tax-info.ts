export class TaxInfo {

  vat_payer: boolean;
  tax_office_id: string;

  constructor(vat_payer: boolean, tax_office_id: string) {
    this.vat_payer = vat_payer;
    this.tax_office_id = tax_office_id;
  }
}
