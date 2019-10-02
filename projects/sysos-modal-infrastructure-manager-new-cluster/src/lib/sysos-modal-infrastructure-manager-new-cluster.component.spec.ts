import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewClusterComponent } from './sysos-modal-infrastructure-manager-new-cluster.component';

describe('SysosModalInfrastructureManagerNewClusterComponent', () => {
  let component: SysosModalInfrastructureManagerNewClusterComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerNewClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerNewClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerNewClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
