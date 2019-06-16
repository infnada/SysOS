import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerStatusComponent } from './datastore-explorer-status.component';

describe('DatastoreExplorerStatusComponent', () => {
  let component: DatastoreExplorerStatusComponent;
  let fixture: ComponentFixture<DatastoreExplorerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
