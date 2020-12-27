import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRangeComponent } from './item-range.component';

describe('ItemRangeComponent', () => {
  let component: ItemRangeComponent;
  let fixture: ComponentFixture<ItemRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
