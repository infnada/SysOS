import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreClusterResourcesComponent } from './datastore-cluster-resources.component';

describe('DatastoreClusterResourcesComponent', () => {
  let component: DatastoreClusterResourcesComponent;
  let fixture: ComponentFixture<DatastoreClusterResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreClusterResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreClusterResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
