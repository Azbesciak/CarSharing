import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPositionComponent } from './menu-position.component';

describe('MenuPositionComponent', () => {
  let component: MenuPositionComponent;
  let fixture: ComponentFixture<MenuPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
