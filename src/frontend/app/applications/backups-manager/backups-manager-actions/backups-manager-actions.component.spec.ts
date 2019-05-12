import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsManagerActionsComponent } from './backups-manager-actions.component';

describe('BackupsManagerActionsComponent', () => {
  let component: BackupsManagerActionsComponent;
  let fixture: ComponentFixture<BackupsManagerActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupsManagerActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsManagerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
