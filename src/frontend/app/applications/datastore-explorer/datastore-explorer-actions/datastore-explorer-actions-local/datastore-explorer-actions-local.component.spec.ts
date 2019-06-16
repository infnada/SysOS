import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerActionsLocalComponent } from './datastore-explorer-actions-local.component';

describe('DatastoreExplorerActionsLocalComponent', () => {
  let component: DatastoreExplorerActionsLocalComponent;
  let fixture: ComponentFixture<DatastoreExplorerActionsLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerActionsLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerActionsLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
