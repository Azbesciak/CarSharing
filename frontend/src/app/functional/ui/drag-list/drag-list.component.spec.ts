import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragListComponent } from './drag-list.component';

describe('DragListComponent', () => {
  let component: DragListComponent;
  let fixture: ComponentFixture<DragListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
