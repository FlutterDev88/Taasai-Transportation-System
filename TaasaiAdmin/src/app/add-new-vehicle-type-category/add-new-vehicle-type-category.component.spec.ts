import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVehicleTypeCategoryComponent } from './add-new-vehicle-type-category.component';

describe('AddNewVehicleTypeCategoryComponent', () => {
  let component: AddNewVehicleTypeCategoryComponent;
  let fixture: ComponentFixture<AddNewVehicleTypeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewVehicleTypeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVehicleTypeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
