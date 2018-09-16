import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContractorUpdateComponent} from './contractor-update.component';

describe('ContractorUpdateComponent', () => {
  let component: ContractorUpdateComponent;
  let fixture: ComponentFixture<ContractorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
