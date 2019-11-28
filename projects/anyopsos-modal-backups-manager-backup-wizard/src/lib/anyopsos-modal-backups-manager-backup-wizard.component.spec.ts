import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalBackupsManagerBackupWizardComponent } from './anyopsos-modal-backups-manager-backup-wizard.component';

describe('AnyOpsOSModalBackupsManagerBackupWizardComponent', () => {
  let component: AnyOpsOSModalBackupsManagerBackupWizardComponent;
  let fixture: ComponentFixture<AnyOpsOSModalBackupsManagerBackupWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalBackupsManagerBackupWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalBackupsManagerBackupWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
