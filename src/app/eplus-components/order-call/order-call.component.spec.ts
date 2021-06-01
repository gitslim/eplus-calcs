import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCallComponent } from './order-call.component';

describe('OrderCallComponent', () => {
  let component: OrderCallComponent;
  let fixture: ComponentFixture<OrderCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
