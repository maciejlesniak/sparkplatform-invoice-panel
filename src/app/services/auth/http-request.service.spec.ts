import {inject, TestBed} from '@angular/core/testing';

import {HttpRequestServiceService} from './http-request.service';

describe('HttpRequestServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpRequestServiceService]
    });
  });

  it('should be created', inject([HttpRequestServiceService], (service: HttpRequestServiceService) => {
    expect(service).toBeTruthy();
  }));
});
