import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcGazComponent } from './calc-gaz.component';

describe('CalcGazComponent', () => {
  let component: CalcGazComponent;
  let fixture: ComponentFixture<CalcGazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcGazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcGazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
