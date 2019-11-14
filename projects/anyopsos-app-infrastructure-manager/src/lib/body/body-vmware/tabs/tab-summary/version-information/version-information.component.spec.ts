import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionInformationComponent } from './version-information.component';

describe('VersionInformationComponent', () => {
  let component: VersionInformationComponent;
  let fixture: ComponentFixture<VersionInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
