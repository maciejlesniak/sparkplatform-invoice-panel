import {inject, TestBed} from '@angular/core/testing';

import {TaxOfficesCommunicationService} from './tax-offices-communication.service';

describe('TaxOfficesCommunicationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxOfficesCommunicationService]
    });
  });

  it('should be created', inject([TaxOfficesCommunicationService], (service: TaxOfficesCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
