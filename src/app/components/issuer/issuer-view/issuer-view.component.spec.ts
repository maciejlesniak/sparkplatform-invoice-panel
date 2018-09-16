import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IssuerViewComponent} from './issuer-view.component';

describe('IssuerViewComponent', () => {
  let component: IssuerViewComponent;
  let fixture: ComponentFixture<IssuerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
