import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerRescanStorageComponent } from './anyopsos-modal-infrastructure-manager-rescan-storage.component';

describe('AnyOpsOSModalInfrastructureManagerRescanStorageComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerRescanStorageComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerRescanStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerRescanStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerRescanStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
