import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalBackupWizardComponent } from './anyopsos-modal-backup-wizard.component';

describe('AnyOpsOSModalBackupWizardComponent', () => {
  let component: AnyOpsOSModalBackupWizardComponent;
  let fixture: ComponentFixture<AnyOpsOSModalBackupWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalBackupWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalBackupWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
