import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadsGeneratorComponent } from './loads-generator.component';

describe('LoadsGeneratorComponent', () => {
  let component: LoadsGeneratorComponent;
  let fixture: ComponentFixture<LoadsGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadsGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadsGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
