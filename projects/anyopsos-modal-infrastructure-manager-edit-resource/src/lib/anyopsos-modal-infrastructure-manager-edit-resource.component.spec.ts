import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerEditResourceComponent } from './anyopsos-modal-infrastructure-manager-edit-resource.component';

describe('AnyOpsOSModalInfrastructureManagerEditResourceComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerEditResourceComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerEditResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerEditResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerEditResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
