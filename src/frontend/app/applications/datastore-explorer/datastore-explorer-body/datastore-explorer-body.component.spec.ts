import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerBodyComponent } from './datastore-explorer-body.component';

describe('DatastoreExplorerBodyComponent', () => {
  let component: DatastoreExplorerBodyComponent;
  let fixture: ComponentFixture<DatastoreExplorerBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
