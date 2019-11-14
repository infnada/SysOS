import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerRemoveTagComponent } from './anyopsos-modal-infrastructure-manager-remove-tag.component';

describe('AnyOpsOSModalInfrastructureManagerRemoveTagComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerRemoveTagComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerRemoveTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerRemoveTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerRemoveTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
