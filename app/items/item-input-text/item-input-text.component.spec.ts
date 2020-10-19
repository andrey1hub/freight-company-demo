import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInputTextComponent } from './item-input-text.component';

describe('ItemInputTextComponent', () => {
  let component: ItemInputTextComponent;
  let fixture: ComponentFixture<ItemInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
