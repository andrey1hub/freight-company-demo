import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainItemSelectableComponent } from './main-item-selectable.component';

describe('MainItemSelectableComponent', () => {
  let component: MainItemSelectableComponent;
  let fixture: ComponentFixture<MainItemSelectableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainItemSelectableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainItemSelectableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
