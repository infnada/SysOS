import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerAddPermissionComponent } from './sysos-modal-infrastructure-manager-add-permission.component';

describe('SysosModalInfrastructureManagerAddPermissionComponent', () => {
  let component: SysosModalInfrastructureManagerAddPermissionComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerAddPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerAddPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerAddPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
