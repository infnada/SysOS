import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalBackupWizardComponent } from './sysos-modal-backup-wizard.component';

describe('SysosModalBackupWizardComponent', () => {
  let component: SysosModalBackupWizardComponent;
  let fixture: ComponentFixture<SysosModalBackupWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalBackupWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalBackupWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
