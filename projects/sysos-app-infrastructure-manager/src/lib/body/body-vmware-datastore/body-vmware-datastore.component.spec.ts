import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVmwareDatastoreComponent } from './body-vmware-datastore.component';

describe('BodyVmwareDatastoreComponent', () => {
  let component: BodyVmwareDatastoreComponent;
  let fixture: ComponentFixture<BodyVmwareDatastoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyVmwareDatastoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyVmwareDatastoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
