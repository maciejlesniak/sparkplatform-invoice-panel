import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IssuerUpdateComponent} from './issuer-update.component';

describe('IssuerUpdateComponent', () => {
  let component: IssuerUpdateComponent;
  let fixture: ComponentFixture<IssuerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuerUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
