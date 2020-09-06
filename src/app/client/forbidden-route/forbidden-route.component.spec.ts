import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenRouteComponent } from './forbidden-route.component';

describe('ForbiddenRouteComponent', () => {
  let component: ForbiddenRouteComponent;
  let fixture: ComponentFixture<ForbiddenRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForbiddenRouteComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbiddenRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
