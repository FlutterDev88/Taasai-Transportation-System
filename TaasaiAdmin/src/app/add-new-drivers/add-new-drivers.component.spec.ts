import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDriversComponent } from './add-new-drivers.component';

describe('AddNewDriversComponent', () => {
  let component: AddNewDriversComponent;
  let fixture: ComponentFixture<AddNewDriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
