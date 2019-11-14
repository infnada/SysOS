import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInputComponent } from './anyopsos-modal-input.component';

describe('AnyOpsOSModalInputComponent', () => {
  let component: AnyOpsOSModalInputComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
