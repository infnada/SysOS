import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerAddCategoryComponent } from './anyopsos-modal-infrastructure-manager-add-category.component';

describe('AnyOpsOSModalInfrastructureManagerAddCategoryComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerAddCategoryComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerAddCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerAddCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
