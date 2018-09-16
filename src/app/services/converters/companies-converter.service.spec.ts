import {inject, TestBed} from '@angular/core/testing';

import {CompaniesConverterService} from './companies-converter.service';

describe('CompaniesConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompaniesConverterService]
    });
  });

  it('should be created', inject([CompaniesConverterService], (service: CompaniesConverterService) => {
    expect(service).toBeTruthy();
  }));
});
