import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewDistributedPortGroupComponent } from './sysos-modal-infrastructure-manager-new-distributed-port-group.component';

describe('SysosModalInfrastructureManagerNewDistributedPortGroupComponent', () => {
  let component: SysosModalInfrastructureManagerNewDistributedPortGroupComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerNewDistributedPortGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerNewDistributedPortGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerNewDistributedPortGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
