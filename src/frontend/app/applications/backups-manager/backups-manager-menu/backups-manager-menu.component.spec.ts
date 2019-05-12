import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsManagerMenuComponent } from './backups-manager-menu.component';

describe('BackupsManagerMenuComponent', () => {
  let component: BackupsManagerMenuComponent;
  let fixture: ComponentFixture<BackupsManagerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupsManagerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsManagerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
