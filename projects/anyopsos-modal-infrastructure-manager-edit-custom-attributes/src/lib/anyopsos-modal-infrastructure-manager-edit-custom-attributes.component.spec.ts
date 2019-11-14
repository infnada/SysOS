import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerEditCustomAttributesComponent } from './anyopsos-modal-infrastructure-manager-edit-custom-attributes.component';

describe('AnyOpsOSModalInfrastructureManagerEditCustomAttributesComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerEditCustomAttributesComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerEditCustomAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerEditCustomAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerEditCustomAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
