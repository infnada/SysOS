import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsManagerComponent } from './backups-manager.component';

describe('BackupsManagerComponent', () => {
  let component: BackupsManagerComponent;
  let fixture: ComponentFixture<BackupsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
