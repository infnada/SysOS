import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerImportDistributedSwitchComponent } from './sysos-modal-infrastructure-manager-import-distributed-switch.component';

describe('SysosModalInfrastructureManagerImportDistributedSwitchComponent', () => {
  let component: SysosModalInfrastructureManagerImportDistributedSwitchComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerImportDistributedSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerImportDistributedSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerImportDistributedSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
