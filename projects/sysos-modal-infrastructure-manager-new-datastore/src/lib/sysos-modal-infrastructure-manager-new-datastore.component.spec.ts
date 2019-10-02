import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewDatastoreComponent } from './sysos-modal-infrastructure-manager-new-datastore.component';

describe('SysosModalInfrastructureManagerNewDatastoreComponent', () => {
  let component: SysosModalInfrastructureManagerNewDatastoreComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerNewDatastoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerNewDatastoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerNewDatastoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
