import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchFeaturesComponent } from './switch-features.component';

describe('SwitchFeaturesComponent', () => {
  let component: SwitchFeaturesComponent;
  let fixture: ComponentFixture<SwitchFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
