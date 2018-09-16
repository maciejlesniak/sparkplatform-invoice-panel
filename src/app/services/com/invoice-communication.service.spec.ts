import {inject, TestBed} from '@angular/core/testing';

import {InvoiceCommunicationService} from './invoice-communication.service';

describe('InvoiceCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceCommunicationService]
    });
  });

  it('should be created', inject([InvoiceCommunicationService], (service: InvoiceCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
