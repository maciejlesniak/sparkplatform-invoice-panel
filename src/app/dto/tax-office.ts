import {BankAccount} from "./bank-account";
import {AddressDto} from "./com-dtos";

export class TaxOffice {
  id: string;
  name: string;
  address: AddressDto;
  accounts: BankAccount[];
}
