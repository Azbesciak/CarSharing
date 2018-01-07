import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRoutePartComponent } from './detailed-route-part.component';

describe('DetailedRoutePartComponent', () => {
  let component: DetailedRoutePartComponent;
  let fixture: ComponentFixture<DetailedRoutePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedRoutePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedRoutePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
