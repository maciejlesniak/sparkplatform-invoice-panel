import {Injectable} from '@angular/core';
import {Company} from "../../dto/company";
import {BusinessObjectResponse, CompanyRequest, CompanyResponse} from "../../dto/com-dtos";
import {Representation} from "../../dto/representation";
import {Address} from "../../dto/address";

@Injectable()
export class CompaniesConverterService {

  constructor() {
  }

  public static companyResponseToCompany(value: CompanyResponse): Company {
    return {
      id: value.id,
      company_full_name: value.full_name,
      company_short_name: value.short_name,
      accounts: value.accounts,
      regon: value.regon,
      nip: value.nip,
      tax_info: {
        tax_office_id: value.tax_office_id,
        vat_payer: value.vat_payer,
      },
      main_address: {
        street: value.address.street,
        house: value.address.house,
        local: value.address.local,
        city: value.address.city,
        post_office_city: value.address.zip_city,
        postal_code: value.address.zip
      },
      representation: {
        first_name: value.coordinator.first_name,
        second_name: value.coordinator.second_name,
        last_name: value.coordinator.last_name
      }
    }
  }

  public static businessObjectResponseToCompanyResponse(value: BusinessObjectResponse): CompanyResponse {
    return {
      id: value.id,
      nip: value.nip,
      regon: value.regon,
      vat_payer: value.vat_payer,
      tax_office_id: value.tax_office_id,
      accounts: value.accounts,
      full_name: value.full_name,
      short_name: value.short_name,
      coordinator: {
        first_name: value.coordinator.first_name,
        second_name: value.coordinator.second_name,
        last_name: value.coordinator.last_name
      },
      address: {
        street: value.address.street,
        house: value.address.house,
        local: value.address.local,
        city: value.address.city,
        zip_city: value.address.zip_city,
        zip: value.address.zip,
        country: value.address.country
      }
    };
  }


  public static companyToCompanyRequest(value: Company): CompanyRequest {
    return {
      full_name: value.company_full_name,
      short_name: value.company_short_name,
      address: {
        city: value.main_address.city,
        country: 'PL',
        house: value.main_address.house,
        local: value.main_address.local,
        street: value.main_address.street,
        zip: value.main_address.postal_code,
        zip_city: value.main_address.post_office_city
      },
      nip: value.nip,
      regon: value.regon,
      coordinator: {
        first_name: value.representation.first_name,
        second_name: value.representation.second_name,
        last_name: value.representation.last_name
      },
      accounts: value.accounts,
      vat_payer: value.tax_info.vat_payer,
      tax_office_id: value.tax_info.tax_office_id
    };
  }

  public static businessObjectResponseToCompanyConverter(value: BusinessObjectResponse): Company {
    return new Company(
      value.id,
      value.full_name,
      value.full_name,
      value.nip,
      '',
      null,
      new Address(
        value.address.street,
        value.address.house,
        value.address.local,
        value.address.city,
        value.address.zip,
        value.address.city
      ),
      value.accounts,
      new Representation(
        value.coordinator.first_name,
        '',
        value.coordinator.last_name
      )
    )
  }


}
