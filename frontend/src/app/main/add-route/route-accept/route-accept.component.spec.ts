import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteAcceptComponent } from './route-accept.component';

describe('RouteAcceptComponent', () => {
  let component: RouteAcceptComponent;
  let fixture: ComponentFixture<RouteAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
