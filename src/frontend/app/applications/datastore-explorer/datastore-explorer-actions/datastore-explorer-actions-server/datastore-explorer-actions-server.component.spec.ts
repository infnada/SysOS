import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerActionsServerComponent } from './datastore-explorer-actions-server.component';

describe('DatastoreExplorerActionsServerComponent', () => {
  let component: DatastoreExplorerActionsServerComponent;
  let fixture: ComponentFixture<DatastoreExplorerActionsServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerActionsServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerActionsServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
