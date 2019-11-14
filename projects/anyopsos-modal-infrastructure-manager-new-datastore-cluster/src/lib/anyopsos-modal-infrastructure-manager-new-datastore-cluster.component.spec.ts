import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerNewDatastoreClusterComponent } from './anyopsos-modal-infrastructure-manager-new-datastore-cluster.component';

describe('AnyOpsOSModalInfrastructureManagerNewDatastoreClusterComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerNewDatastoreClusterComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerNewDatastoreClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerNewDatastoreClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerNewDatastoreClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
