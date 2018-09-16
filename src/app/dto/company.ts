import {TaxInfo} from './tax-info';
import {Address} from './address';
import {Representation} from './representation';
import {BankAccount} from './bank-account';

export class Company {

  public id?: string;
  public company_short_name: string;
  public company_full_name: string;
  public nip: string;
  public regon: string;
  public tax_info: TaxInfo;
  public main_address: Address;
  public accounts: BankAccount[];
  public representation: Representation;


  constructor(id: string,
              company_short_name: string,
              company_full_name: string,
              nip: string,
              regon: string,
              tax_info: TaxInfo,
              main_address: Address,
              accounts: BankAccount[],
              representation: Representation) {
    this.id = id;
    this.company_short_name = company_short_name;
    this.company_full_name = company_full_name;
    this.nip = nip;
    this.regon = regon;
    this.tax_info = tax_info;
    this.main_address = main_address;
    this.accounts = accounts;
    this.representation = representation;
  }

  public static empty(): Company {
    return new Company('', '', '', '', '',
      new TaxInfo(false, ''),
      new Address('', '', '', '', '', ''),
      [], new Representation('', '', ''));
  }
}



