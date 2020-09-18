import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFareComponent } from './add-new-fare.component';

describe('AddNewFareComponent', () => {
  let component: AddNewFareComponent;
  let fixture: ComponentFixture<AddNewFareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewFareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
