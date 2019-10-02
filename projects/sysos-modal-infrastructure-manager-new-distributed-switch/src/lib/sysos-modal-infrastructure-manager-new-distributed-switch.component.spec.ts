import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewDistributedSwitchComponent } from './sysos-modal-infrastructure-manager-new-distributed-switch.component';

describe('SysosModalInfrastructureManagerNewDistributedSwitchComponent', () => {
  let component: SysosModalInfrastructureManagerNewDistributedSwitchComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerNewDistributedSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerNewDistributedSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerNewDistributedSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
