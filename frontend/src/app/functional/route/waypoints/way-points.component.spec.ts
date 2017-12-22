import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WayPointsComponent } from './way-points.component';

describe('WayPointsComponent', () => {
  let component: WayPointsComponent;
  let fixture: ComponentFixture<WayPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WayPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WayPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
