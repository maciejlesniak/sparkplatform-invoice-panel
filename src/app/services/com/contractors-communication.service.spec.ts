import {inject, TestBed} from '@angular/core/testing';

import {ContractorsCommunicationService} from './contractors-communication.service';

describe('ContractorsCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractorsCommunicationService]
    });
  });

  it('should be created', inject([ContractorsCommunicationService], (service: ContractorsCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
