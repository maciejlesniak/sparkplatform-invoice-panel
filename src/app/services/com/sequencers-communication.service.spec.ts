import {inject, TestBed} from '@angular/core/testing';

import {SequencersCommunicationService} from './sequencers-communication.service';

describe('SequencersCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SequencersCommunicationService]
    });
  });

  it('should be created', inject([SequencersCommunicationService], (service: SequencersCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
