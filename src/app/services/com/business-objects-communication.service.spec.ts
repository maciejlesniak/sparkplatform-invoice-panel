import {inject, TestBed} from '@angular/core/testing';

import {BusinessObjectsCommunicationService} from './business-objects-communication.service';

describe('BusinessObjectsCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessObjectsCommunicationService]
    });
  });

  it('should be created', inject([BusinessObjectsCommunicationService], (service: BusinessObjectsCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
