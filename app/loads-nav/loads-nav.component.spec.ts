import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadsNavComponent } from './loads-nav.component';

describe('LoadsNavComponent', () => {
  let component: LoadsNavComponent;
  let fixture: ComponentFixture<LoadsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
