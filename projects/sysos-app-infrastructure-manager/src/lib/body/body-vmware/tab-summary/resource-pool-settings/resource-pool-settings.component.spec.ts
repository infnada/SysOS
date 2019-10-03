import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePoolSettingsComponent } from './resource-pool-settings.component';

describe('ResourcePoolSettingsComponent', () => {
  let component: ResourcePoolSettingsComponent;
  let fixture: ComponentFixture<ResourcePoolSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcePoolSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcePoolSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
