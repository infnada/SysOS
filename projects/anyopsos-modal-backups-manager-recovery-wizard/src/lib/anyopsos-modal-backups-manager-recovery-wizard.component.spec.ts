import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalBackupsManagerRecoveryWizardComponent } from './anyopsos-modal-backups-manager-recovery-wizard.component';

describe('AnyOpsOSModalBackupsManagerRecoveryWizardComponent', () => {
  let component: AnyOpsOSModalBackupsManagerRecoveryWizardComponent;
  let fixture: ComponentFixture<AnyOpsOSModalBackupsManagerRecoveryWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalBackupsManagerRecoveryWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalBackupsManagerRecoveryWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
