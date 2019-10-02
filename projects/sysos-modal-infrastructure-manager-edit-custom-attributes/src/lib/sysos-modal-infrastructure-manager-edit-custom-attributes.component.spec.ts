import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerEditCustomAttributesComponent } from './sysos-modal-infrastructure-manager-edit-custom-attributes.component';

describe('SysosModalInfrastructureManagerEditCustomAttributesComponent', () => {
  let component: SysosModalInfrastructureManagerEditCustomAttributesComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerEditCustomAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerEditCustomAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerEditCustomAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
