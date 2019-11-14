import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyNetappVolumeComponent } from './body-netapp-volume.component';

describe('BodyNetappVolumeComponent', () => {
  let component: BodyNetappVolumeComponent;
  let fixture: ComponentFixture<BodyNetappVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyNetappVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyNetappVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
