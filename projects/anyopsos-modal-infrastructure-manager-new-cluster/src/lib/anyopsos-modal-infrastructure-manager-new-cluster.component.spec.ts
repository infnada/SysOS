import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerNewClusterComponent } from './anyopsos-modal-infrastructure-manager-new-cluster.component';

describe('AnyOpsOSModalInfrastructureManagerNewClusterComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerNewClusterComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerNewClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerNewClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerNewClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
