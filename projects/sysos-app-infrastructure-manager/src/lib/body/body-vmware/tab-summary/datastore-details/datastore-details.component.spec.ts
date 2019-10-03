import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreDetailsComponent } from './datastore-details.component';

describe('DatastoreDetailsComponent', () => {
  let component: DatastoreDetailsComponent;
  let fixture: ComponentFixture<DatastoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
