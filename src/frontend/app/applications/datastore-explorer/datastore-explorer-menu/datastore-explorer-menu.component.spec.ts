import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerMenuComponent } from './datastore-explorer-menu.component';

describe('DatastoreExplorerMenuComponent', () => {
  let component: DatastoreExplorerMenuComponent;
  let fixture: ComponentFixture<DatastoreExplorerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
