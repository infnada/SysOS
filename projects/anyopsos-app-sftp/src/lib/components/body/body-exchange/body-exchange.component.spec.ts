import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyExchangeComponent } from './body-exchange.component';

describe('BodyExchangeComponent', () => {
  let component: BodyExchangeComponent;
  let fixture: ComponentFixture<BodyExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
