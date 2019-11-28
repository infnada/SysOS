import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalDefaultInputComponent } from './anyopsos-modal-default-input.component';

describe('AnyOpsOSModalDefaultInputComponent', () => {
  let component: AnyOpsOSModalDefaultInputComponent;
  let fixture: ComponentFixture<AnyOpsOSModalDefaultInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalDefaultInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalDefaultInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
