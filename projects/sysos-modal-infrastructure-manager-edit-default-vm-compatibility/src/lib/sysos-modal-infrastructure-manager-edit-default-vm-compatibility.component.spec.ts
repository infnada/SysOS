import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerEditDefaultVmCompatibilityComponent } from './sysos-modal-infrastructure-manager-edit-default-vm-compatibility.component';

describe('SysosModalInfrastructureManagerEditDefaultVmCompatibilityComponent', () => {
  let component: SysosModalInfrastructureManagerEditDefaultVmCompatibilityComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerEditDefaultVmCompatibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerEditDefaultVmCompatibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerEditDefaultVmCompatibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
