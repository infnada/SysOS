import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpBodyServerComponent } from './sftp-body-server.component';

describe('SftpBodyServerComponent', () => {
  let component: SftpBodyServerComponent;
  let fixture: ComponentFixture<SftpBodyServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SftpBodyServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpBodyServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
