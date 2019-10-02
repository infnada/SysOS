import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerRemediationPreCheckComponent } from './sysos-modal-infrastructure-manager-remediation-pre-check.component';

describe('SysosModalInfrastructureManagerRemediationPreCheckComponent', () => {
  let component: SysosModalInfrastructureManagerRemediationPreCheckComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerRemediationPreCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerRemediationPreCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerRemediationPreCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
