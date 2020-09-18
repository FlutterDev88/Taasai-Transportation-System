import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleCategoryComponent } from './edit-vehicle-category.component';

describe('EditVehicleCategoryComponent', () => {
  let component: EditVehicleCategoryComponent;
  let fixture: ComponentFixture<EditVehicleCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVehicleCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicleCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
