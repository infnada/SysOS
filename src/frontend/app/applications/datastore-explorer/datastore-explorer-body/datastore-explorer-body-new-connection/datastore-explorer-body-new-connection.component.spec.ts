import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerBodyNewConnectionComponent } from './datastore-explorer-body-new-connection.component';

describe('DatastoreExplorerBodyNewConnectionComponent', () => {
  let component: DatastoreExplorerBodyNewConnectionComponent;
  let fixture: ComponentFixture<DatastoreExplorerBodyNewConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerBodyNewConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerBodyNewConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
