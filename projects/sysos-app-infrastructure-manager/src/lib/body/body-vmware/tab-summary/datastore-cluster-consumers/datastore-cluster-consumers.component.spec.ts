import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreClusterConsumersComponent } from './datastore-cluster-consumers.component';

describe('DatastoreClusterConsumersComponent', () => {
  let component: DatastoreClusterConsumersComponent;
  let fixture: ComponentFixture<DatastoreClusterConsumersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreClusterConsumersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreClusterConsumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
