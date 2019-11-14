import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerNewDatastoreComponent } from './anyopsos-modal-infrastructure-manager-new-datastore.component';

describe('AnyOpsOSModalInfrastructureManagerNewDatastoreComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerNewDatastoreComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerNewDatastoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerNewDatastoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerNewDatastoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
