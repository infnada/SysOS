import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpActionsLocalComponent } from './sftp-actions-local.component';

describe('SftpActionsLocalComponent', () => {
  let component: SftpActionsLocalComponent;
  let fixture: ComponentFixture<SftpActionsLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SftpActionsLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpActionsLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
