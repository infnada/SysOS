import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerAssignTagComponent } from './sysos-modal-infrastructure-manager-assign-tag.component';

describe('SysosModalInfrastructureManagerAssignTagComponent', () => {
  let component: SysosModalInfrastructureManagerAssignTagComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerAssignTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerAssignTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerAssignTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
