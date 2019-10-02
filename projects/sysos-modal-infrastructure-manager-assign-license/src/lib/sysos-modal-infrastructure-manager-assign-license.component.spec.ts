import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerAssignLicenseComponent } from './sysos-modal-infrastructure-manager-assign-license.component';

describe('SysosModalInfrastructureManagerAssignLicenseComponent', () => {
  let component: SysosModalInfrastructureManagerAssignLicenseComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerAssignLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerAssignLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerAssignLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
