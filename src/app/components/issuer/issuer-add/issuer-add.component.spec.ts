import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IssuerAddComponent} from './issuer-add.component';

describe('IssuerAddComponent', () => {
  let component: IssuerAddComponent;
  let fixture: ComponentFixture<IssuerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
