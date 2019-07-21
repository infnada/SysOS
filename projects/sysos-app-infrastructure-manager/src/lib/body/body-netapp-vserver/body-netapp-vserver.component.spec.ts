import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyNetappVserverComponent } from './body-netapp-vserver.component';

describe('BodyNetappVserverComponent', () => {
  let component: BodyNetappVserverComponent;
  let fixture: ComponentFixture<BodyNetappVserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyNetappVserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyNetappVserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
