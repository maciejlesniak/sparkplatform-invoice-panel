import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceCorrectionViewComponent} from './invoice-correction-view.component';

describe('InvoiceCorrectionViewComponent', () => {
  let component: InvoiceCorrectionViewComponent;
  let fixture: ComponentFixture<InvoiceCorrectionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceCorrectionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCorrectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
