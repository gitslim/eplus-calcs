import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CalcKotelComponent} from "./calc-kotel.component";

describe('CalcKotelComponent', () => {
  let component: CalcKotelComponent;
  let fixture: ComponentFixture<CalcKotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalcKotelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcKotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
