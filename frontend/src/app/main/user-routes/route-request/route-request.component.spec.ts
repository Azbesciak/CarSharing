import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteRequestComponent } from './route-request.component';

describe('RouteRequestComponent', () => {
  let component: RouteRequestComponent;
  let fixture: ComponentFixture<RouteRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
