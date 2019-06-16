import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerBodyServerComponent } from './datastore-explorer-body-server.component';

describe('DatastoreExplorerBodyServerComponent', () => {
  let component: DatastoreExplorerBodyServerComponent;
  let fixture: ComponentFixture<DatastoreExplorerBodyServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerBodyServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerBodyServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
