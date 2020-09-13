import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeCategoryListComponent } from './vehicle-type-category-list.component';

describe('VehicleTypeCategoryListComponent', () => {
  let component: VehicleTypeCategoryListComponent;
  let fixture: ComponentFixture<VehicleTypeCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
