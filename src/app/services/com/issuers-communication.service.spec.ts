import {inject, TestBed} from '@angular/core/testing';

import {IssuersCommunicationService} from './issuers-communication.service';

describe('IssuersCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssuersCommunicationService]
    });
  });

  it('should be created', inject([IssuersCommunicationService], (service: IssuersCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
