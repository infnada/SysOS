import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerComponent } from './datastore-explorer.component';

describe('DatastoreExplorerComponent', () => {
  let component: DatastoreExplorerComponent;
  let fixture: ComponentFixture<DatastoreExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
