import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneFareListComponent } from './zone-fare-list.component';

describe('ZoneFareListComponent', () => {
  let component: ZoneFareListComponent;
  let fixture: ComponentFixture<ZoneFareListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneFareListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneFareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
