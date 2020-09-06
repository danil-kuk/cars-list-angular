import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsEditorComponent } from './cars-editor.component';

describe('CarsEditorComponent', () => {
  let component: CarsEditorComponent;
  let fixture: ComponentFixture<CarsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsEditorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
