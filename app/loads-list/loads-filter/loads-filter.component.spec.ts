import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadsFilterComponent } from './loads-filter.component';

describe('LoadsFilterComponent', () => {
  let component: LoadsFilterComponent;
  let fixture: ComponentFixture<LoadsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
