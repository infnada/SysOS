import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalRecoveryWizardComponent } from './anyopsos-modal-recovery-wizard.component';

describe('AnyOpsOSModalRecoveryWizardComponent', () => {
  let component: AnyOpsOSModalRecoveryWizardComponent;
  let fixture: ComponentFixture<AnyOpsOSModalRecoveryWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalRecoveryWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalRecoveryWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
