import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadsListComponent } from './loads-list.component';

describe('LoadsListComponent', () => {
  let component: LoadsListComponent;
  let fixture: ComponentFixture<LoadsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
