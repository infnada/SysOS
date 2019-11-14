import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerAddPermissionComponent } from './anyopsos-modal-infrastructure-manager-add-permission.component';

describe('AnyOpsOSModalInfrastructureManagerAddPermissionComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerAddPermissionComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerAddPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerAddPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerAddPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
