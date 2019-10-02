import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerRescanStorageComponent } from './sysos-modal-infrastructure-manager-rescan-storage.component';

describe('SysosModalInfrastructureManagerRescanStorageComponent', () => {
  let component: SysosModalInfrastructureManagerRescanStorageComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerRescanStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerRescanStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerRescanStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
