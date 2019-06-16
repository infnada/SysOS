import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerBodyLocalComponent } from './datastore-explorer-body-local.component';

describe('DatastoreExplorerBodyLocalComponent', () => {
  let component: DatastoreExplorerBodyLocalComponent;
  let fixture: ComponentFixture<DatastoreExplorerBodyLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerBodyLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerBodyLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
