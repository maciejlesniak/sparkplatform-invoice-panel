import {inject, TestBed} from '@angular/core/testing';

import {InvoicesCommunicationService} from './invoices-communication.service';

describe('InvoicesCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoicesCommunicationService]
    });
  });

  it('should be created', inject([InvoicesCommunicationService], (service: InvoicesCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
