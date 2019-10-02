import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewDatacenterComponent } from './sysos-modal-infrastructure-manager-new-datacenter.component';

describe('SysosModalInfrastructureManagerNewDatacenterComponent', () => {
  let component: SysosModalInfrastructureManagerNewDatacenterComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerNewDatacenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerNewDatacenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerNewDatacenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
