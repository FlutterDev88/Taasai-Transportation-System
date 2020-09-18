import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVehicleTypeComponent } from './add-new-vehicle-type.component';

describe('AddNewVehicleTypeComponent', () => {
  let component: AddNewVehicleTypeComponent;
  let fixture: ComponentFixture<AddNewVehicleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewVehicleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
