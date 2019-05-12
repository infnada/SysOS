import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsManagerBodyComponent } from './credentials-manager-body.component';

describe('CredentialsManagerBodyComponent', () => {
  let component: CredentialsManagerBodyComponent;
  let fixture: ComponentFixture<CredentialsManagerBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsManagerBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsManagerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
