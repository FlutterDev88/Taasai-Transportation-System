import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVehiclesComponent } from './add-new-vehicles.component';

describe('AddNewVehiclesComponent', () => {
  let component: AddNewVehiclesComponent;
  let fixture: ComponentFixture<AddNewVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
