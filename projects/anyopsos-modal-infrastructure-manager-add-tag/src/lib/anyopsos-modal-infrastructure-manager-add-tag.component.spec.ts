import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerAddTagComponent } from './anyopsos-modal-infrastructure-manager-add-tag.component';

describe('AnyOpsOSModalInfrastructureManagerAddTagComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerAddTagComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerAddTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerAddTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerAddTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
