import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceRegularViewComponent} from './invoice-regular-view.component';

describe('InvoiceRegularViewComponent', () => {
  let component: InvoiceRegularViewComponent;
  let fixture: ComponentFixture<InvoiceRegularViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceRegularViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceRegularViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
