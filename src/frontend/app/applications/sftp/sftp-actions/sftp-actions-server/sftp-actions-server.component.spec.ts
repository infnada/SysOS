import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpActionsServerComponent } from './sftp-actions-server.component';

describe('SftpActionsServerComponent', () => {
  let component: SftpActionsServerComponent;
  let fixture: ComponentFixture<SftpActionsServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SftpActionsServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpActionsServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
