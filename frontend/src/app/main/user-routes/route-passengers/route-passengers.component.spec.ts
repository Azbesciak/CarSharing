import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePassengersComponent } from './route-passengers.component';

describe('RoutePassengersComponent', () => {
  let component: RoutePassengersComponent;
  let fixture: ComponentFixture<RoutePassengersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutePassengersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
