import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerActionsComponent } from './datastore-explorer-actions.component';

describe('DatastoreExplorerActionsComponent', () => {
  let component: DatastoreExplorerActionsComponent;
  let fixture: ComponentFixture<DatastoreExplorerActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
