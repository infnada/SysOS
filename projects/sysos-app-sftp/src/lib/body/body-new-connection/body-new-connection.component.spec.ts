import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyNewConnectionComponent } from './body-new-connection.component';

describe('BodyNewConnectionComponent', () => {
  let component: BodyNewConnectionComponent;
  let fixture: ComponentFixture<BodyNewConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyNewConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyNewConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
