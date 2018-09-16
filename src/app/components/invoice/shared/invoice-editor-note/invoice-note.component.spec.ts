import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceNoteComponent} from './invoice-note.component';

describe('InvoiceNoteComponent', () => {
  let component: InvoiceNoteComponent;
  let fixture: ComponentFixture<InvoiceNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
