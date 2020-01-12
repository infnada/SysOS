import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyServerComponent } from './body-server.component';

describe('BodyServerComponent', () => {
  let component: BodyServerComponent;
  let fixture: ComponentFixture<BodyServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
