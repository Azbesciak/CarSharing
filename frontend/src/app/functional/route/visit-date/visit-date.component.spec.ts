import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDateComponent } from './visit-date.component';

describe('VisitDateComponent', () => {
  let component: VisitDateComponent;
  let fixture: ComponentFixture<VisitDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
