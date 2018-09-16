// requests

import {BankAccount} from "./bank-account";

export class InvoiceRecordRequest {
  subject: string;
  qty: number;
  unit_price: number;
  tax: number;
  units: string;
  currency_symbol: string;
}

export class NewInvoiceRequest {
  invoice_number: string;
  records: InvoiceRecordRequest[];
  payment_method: string;
  payment_due_date: Date;
  created: Date;
  sold: Date;
  issuerId: string;
  contractorId: string;
  note: string;
  issuer_iban: string;
}

export class NewInvoiceCorrectionRequest {
  correction_invoice_number: string;
  correction_date: Date;
  new_payload: NewInvoiceRequest;
}

export class CompanyRequest {
  full_name: string;
  short_name: string;
  nip: string;
  regon: string;
  address: AddressDto;
  coordinator: RepresentationDto;
  accounts: BankAccount[];
  vat_payer: boolean;
  tax_office_id: string;
}

// responses

export class NewInvoiceCorrectionResponse {
  base_doc_id: string;
  correction_invoice_doc_id: string
}

export class BusinessObjectResponse {
  id: string;
  full_name: string;
  short_name: string;
  nip: string;
  regon: string;
  address: AddressResponse;
  coordinator: CoordinatorResponse;
  accounts: BankAccount[];
  tax_office_id: string;
  vat_payer: boolean;
}

export class AddressResponse {
  street: string;
  house: string;
  local: string;
  zip: string;
  zip_city: string;
  city: string;
  country: string;
}

export class CoordinatorResponse {
  first_name: string;
  second_name: string;
  last_name: string;
}

export class InvoiceRecordResponse {
  subject: string;
  qty: number;
  unit_price: number;
  units: string;
  tax: number;
  currency_symbol: string
}

export class CompanyResponse {
  id: string;
  full_name: string;
  short_name: string;
  nip: string;
  regon: string;
  address: AddressDto;
  coordinator: RepresentationDto;
  accounts: BankAccount[];
  vat_payer: boolean;
  tax_office_id: string;
}

class StatusMetadataResponse {
  lock_status: string;
  base_doc_id: string;
  correction_doc_id: string;
}

export class InvoiceResponse {
  doc_id: string;
  base_number: string;
  records: InvoiceRecordResponse[];
  payment_method: string;
  payment_due_date: Date;
  created: Date;
  sold: Date;
  issuer: CompanyResponse;
  contractor: CompanyResponse;
  note: string;
  metadata_status: StatusMetadataResponse;
  payment_bank_account: string;
}

export class CorrectionDetailsResponse {
  correction_number: string;
  correction_date: Date;
  old_version: InvoiceResponse;
  new_version: InvoiceResponse;
}


// shared dtos

export class AddressDto {
  street: string;
  house: string;
  local: string;
  city: string;
  zip: string;
  zip_city: string;
  country: string;
}

export class RepresentationDto {
  first_name: string;
  second_name: string;
  last_name: string;
}

export class InvoiceInfoStatusMetadata {
  changes: string;
  delivery: string;
  payment: string;
}

export class InvoiceInfoCompany {
  full_name: string;
  nip: string;
  street: string;
  house: string;
  local: string;
  zip: string;
  city: string;
  country: string;
  first_name: string;
  last_name: string;
}

export class SequenceNumberResponse {
  number: string
}
