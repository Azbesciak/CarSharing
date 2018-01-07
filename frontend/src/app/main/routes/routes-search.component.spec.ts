import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesSearchComponent } from './routes-search.component';

describe('RoutesSearchComponent', () => {
  let component: RoutesSearchComponent;
  let fixture: ComponentFixture<RoutesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
