import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterResourcesComponent } from './cluster-resources.component';

describe('ClusterResourcesComponent', () => {
  let component: ClusterResourcesComponent;
  let fixture: ComponentFixture<ClusterResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
