import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportImportDbComponent } from './export-import-db.component';

describe('ExportImportDbComponent', () => {
  let component: ExportImportDbComponent;
  let fixture: ComponentFixture<ExportImportDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportImportDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportImportDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
