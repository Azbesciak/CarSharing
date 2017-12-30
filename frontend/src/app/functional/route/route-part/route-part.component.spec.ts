import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePartComponent } from './route-part.component';

describe('RoutePartComponent', () => {
  let component: RoutePartComponent;
  let fixture: ComponentFixture<RoutePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
