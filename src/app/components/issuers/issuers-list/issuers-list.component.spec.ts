import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IssuersListComponent} from './issuers-list.component';

describe('IssuersListComponent', () => {
  let component: IssuersListComponent;
  let fixture: ComponentFixture<IssuersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
