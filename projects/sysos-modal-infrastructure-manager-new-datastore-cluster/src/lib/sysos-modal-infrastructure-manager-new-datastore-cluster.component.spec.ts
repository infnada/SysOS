import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewDatastoreClusterComponent } from './sysos-modal-infrastructure-manager-new-datastore-cluster.component';

describe('SysosModalInfrastructureManagerNewDatastoreClusterComponent', () => {
  let component: SysosModalInfrastructureManagerNewDatastoreClusterComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerNewDatastoreClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerNewDatastoreClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerNewDatastoreClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
