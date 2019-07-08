import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalRecoveryWizardComponent } from './sysos-modal-recovery-wizard.component';

describe('SysosModalRecoveryWizardComponent', () => {
  let component: SysosModalRecoveryWizardComponent;
  let fixture: ComponentFixture<SysosModalRecoveryWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalRecoveryWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalRecoveryWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
