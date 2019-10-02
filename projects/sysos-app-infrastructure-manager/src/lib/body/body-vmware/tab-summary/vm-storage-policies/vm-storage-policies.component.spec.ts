import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmStoragePoliciesComponent } from './vm-storage-policies.component';

describe('VmStoragePoliciesComponent', () => {
  let component: VmStoragePoliciesComponent;
  let fixture: ComponentFixture<VmStoragePoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmStoragePoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmStoragePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
