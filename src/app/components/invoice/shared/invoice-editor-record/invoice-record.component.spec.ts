import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceRecordComponent} from './invoice-record.component';

describe('InvoiceRecordComponent', () => {
  let component: InvoiceRecordComponent;
  let fixture: ComponentFixture<InvoiceRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
