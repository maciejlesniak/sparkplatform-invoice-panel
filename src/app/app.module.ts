import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localePl from '@angular/common/locales/pl';

import {AppComponent} from './app.component';
import {NavbarHeaderComponent} from './components/navbar-header/navbar-header.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CompanyEditorComponent} from './components/company/company-editor/company-editor.component';
import {ContractorsComponent} from "./components/contractors/contractors.component";
import {NipFormatPipe} from './pipes/nip-format.pipe';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {DatePipe, DecimalPipe, registerLocaleData} from "@angular/common";
import {InvoiceComponent} from './components/invoice/regular/invoice-editor/invoice.component';
import {CompanySelectorComponent} from './components/invoice/shared/company-selector/company-selector.component';
import {InvoiceRecordComponent} from './components/invoice/shared/invoice-editor-record/invoice-record.component';
import {InvoiceRecordsComponent} from './components/invoice/shared/invoice-editor-records/invoice-records.component';
import {InvoicePaymentComponent} from './components/invoice/shared/invoice-editor-payment/invoice-payment.component';
import {InvoiceNoteComponent} from './components/invoice/shared/invoice-editor-note/invoice-note.component';
import {InvoicesCommunicationService} from "./services/com/invoices-communication.service";
import {HttpRequestServiceService} from "./services/auth/http-request.service";
import {HttpClientModule} from "@angular/common/http";
import {InvoiceCommunicationService} from "./services/com/invoice-communication.service";
import {InvoiceViewComponent} from './components/invoice/regular/invoice-view/invoice-view.component';
import {SpellPipe} from './pipes/spell.pipe';
import {ContractorsCommunicationService} from "./services/com/contractors-communication.service";
import {TaxOfficesCommunicationService} from "./services/com/tax-offices-communication.service";
import {OrderByPipe} from "./pipes/order-by.pipe";
import {IdentityComponent} from './components/identity/identity.component';
import {IssuersCommunicationService} from "./services/com/issuers-communication.service";
import {ContractorAddComponent} from "./components/contractor/contractor-add/contractor-add.component";
import {CompanyInfoComponent} from './components/company/company-info/company-info.component';
import {BusinessObjectsCommunicationService} from "./services/com/business-objects-communication.service";
import {InvoicesListComponent} from './components/invoices/invoices-list/invoices-list.component';
import {InvoiceCorrectionViewComponent} from './components/invoice/correction/invoice-correction-view/invoice-correction-view.component';
import {InvoiceRegularViewComponent} from './components/invoice/regular/invoice-regular-view/invoice-regular-view.component';
import {SequencersCommunicationService} from "./services/com/sequencers-communication.service";
import {InvoiceCorrectionEditorComponent} from './components/invoice/correction/invoice-correction-editor/invoice-correction-editor.component';
import {SettingsService} from "./services/settings/settings.service";
import {ContractorUpdateComponent} from './components/contractor/contractor-update/contractor-update.component';
import {IssuersListComponent} from './components/issuers/issuers-list/issuers-list.component';
import {IssuerAddComponent} from './components/issuer/issuer-add/issuer-add.component';
import {IssuerUpdateComponent} from './components/issuer/issuer-update/issuer-update.component';
import {IssuerViewComponent} from './components/issuer/issuer-view/issuer-view.component';
import {ContractorViewComponent} from "./components/contractor/contractor-view/contractor-view.component";
import {IbanFormatPipe} from './pipes/iban-format.pipe';
import {AccountEditorComponent} from './components/company/account-editor/account-editor.component';
import {AccountsListEditorComponent} from './components/company/accounts-list-editor/accounts-list-editor.component';

const routes: Routes = [
  {path: '', component: InvoicesComponent},
  {path: 'identity', component: IdentityComponent},

  {path: 'contractors', component: ContractorsComponent},
  {path: 'contractor/add', component: ContractorAddComponent},

  {path: 'documents/invoices', component: InvoicesComponent},
  {path: 'documents/invoice', component: InvoiceComponent},
  {path: 'documents/invoice/:invoiceId', component: InvoiceViewComponent},
  {path: 'documents/invoice/:invoiceId/correction', component: InvoiceCorrectionEditorComponent},

  {path: 'contractor/:businessObjectId', component: ContractorViewComponent},
  {path: 'contractor/:businessObjectId/update', component: ContractorUpdateComponent},

  {path: 'issuer/:businessObjectId', component: IssuerViewComponent},
  {path: 'issuer/:businessObjectId/update', component: IssuerUpdateComponent},
];

registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    SpellPipe,
    OrderByPipe,
    NipFormatPipe,
    NavbarHeaderComponent,
    IdentityComponent,
    CompanyEditorComponent,
    CompanySelectorComponent,
    ContractorsComponent,
    ContractorAddComponent,
    InvoicesComponent,
    InvoiceComponent,
    InvoiceRecordComponent,
    InvoiceRecordsComponent,
    InvoicePaymentComponent,
    InvoiceNoteComponent,
    InvoiceViewComponent,
    CompanyInfoComponent,
    InvoicesListComponent,
    InvoiceCorrectionViewComponent,
    InvoiceRegularViewComponent,
    InvoiceCorrectionEditorComponent,
    ContractorUpdateComponent,
    IssuersListComponent,
    IssuerAddComponent,
    IssuerUpdateComponent,
    IssuerViewComponent,
    ContractorViewComponent,
    IbanFormatPipe,
    AccountEditorComponent,
    AccountsListEditorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pl'},
    NipFormatPipe,
    DatePipe,
    DecimalPipe,
    OrderByPipe,
    HttpRequestServiceService,
    InvoicesCommunicationService,
    InvoiceCommunicationService,
    ContractorsCommunicationService,
    TaxOfficesCommunicationService,
    IssuersCommunicationService,
    BusinessObjectsCommunicationService,
    SequencersCommunicationService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
