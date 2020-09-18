import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewZoneFareComponent } from './add-new-zone-fare.component';

describe('AddNewZoneFareComponent', () => {
  let component: AddNewZoneFareComponent;
  let fixture: ComponentFixture<AddNewZoneFareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewZoneFareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewZoneFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
