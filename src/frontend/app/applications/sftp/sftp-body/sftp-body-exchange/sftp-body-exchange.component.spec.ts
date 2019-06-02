import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpBodyExchangeComponent } from './sftp-body-exchange.component';

describe('SftpBodyExchangeComponent', () => {
  let component: SftpBodyExchangeComponent;
  let fixture: ComponentFixture<SftpBodyExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SftpBodyExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpBodyExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
