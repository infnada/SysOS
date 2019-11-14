import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerAssignTagComponent } from './anyopsos-modal-infrastructure-manager-assign-tag.component';

describe('AnyOpsOSModalInfrastructureManagerAssignTagComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerAssignTagComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerAssignTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerAssignTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerAssignTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
