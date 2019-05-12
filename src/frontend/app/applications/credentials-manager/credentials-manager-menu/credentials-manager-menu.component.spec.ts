import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsManagerMenuComponent } from './credentials-manager-menu.component';

describe('CredentialsManagerMenuComponent', () => {
  let component: CredentialsManagerMenuComponent;
  let fixture: ComponentFixture<CredentialsManagerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsManagerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsManagerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
