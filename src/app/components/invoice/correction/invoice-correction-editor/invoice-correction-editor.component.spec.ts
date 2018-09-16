import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceCorrectionEditorComponent} from './invoice-correction-editor.component';

describe('InvoiceCorrectionEditorComponent', () => {
  let component: InvoiceCorrectionEditorComponent;
  let fixture: ComponentFixture<InvoiceCorrectionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceCorrectionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCorrectionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
