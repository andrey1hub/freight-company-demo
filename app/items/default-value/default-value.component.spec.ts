import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultValueComponent } from './default-value.component';

describe('DefaultValueComponent', () => {
  let component: DefaultValueComponent;
  let fixture: ComponentFixture<DefaultValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
