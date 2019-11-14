import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyNetappComponent } from './body-netapp.component';

describe('BodyNetappComponent', () => {
  let component: BodyNetappComponent;
  let fixture: ComponentFixture<BodyNetappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyNetappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyNetappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
