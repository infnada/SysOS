import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsManagerBodyComponent } from './backups-manager-body.component';

describe('BackupsManagerBodyComponent', () => {
  let component: BackupsManagerBodyComponent;
  let fixture: ComponentFixture<BackupsManagerBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupsManagerBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsManagerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
