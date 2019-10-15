import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageDrsComponent } from './storage-drs.component';

describe('StorageDrsComponent', () => {
  let component: StorageDrsComponent;
  let fixture: ComponentFixture<StorageDrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageDrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageDrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
