import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDatepickerComponent } from './item-datepicker.component';

describe('ItemDatepickerComponent', () => {
  let component: ItemDatepickerComponent;
  let fixture: ComponentFixture<ItemDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
