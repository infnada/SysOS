import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyNetappSnapshotComponent } from './body-netapp-snapshot.component';

describe('BodyNetappSnapshotComponent', () => {
  let component: BodyNetappSnapshotComponent;
  let fixture: ComponentFixture<BodyNetappSnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyNetappSnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyNetappSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
