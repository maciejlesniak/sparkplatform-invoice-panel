import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountsListEditorComponent} from './accounts-list-editor.component';

describe('AccountsListEditorComponent', () => {
  let component: AccountsListEditorComponent;
  let fixture: ComponentFixture<AccountsListEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsListEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
