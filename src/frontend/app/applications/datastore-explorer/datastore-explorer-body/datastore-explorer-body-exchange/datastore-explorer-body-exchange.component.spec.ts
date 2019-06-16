import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreExplorerBodyExchangeComponent } from './datastore-explorer-body-exchange.component';

describe('DatastoreExplorerBodyExchangeComponent', () => {
  let component: DatastoreExplorerBodyExchangeComponent;
  let fixture: ComponentFixture<DatastoreExplorerBodyExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreExplorerBodyExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreExplorerBodyExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
