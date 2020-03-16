import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalKubernetesScaleResourceComponent } from './anyopsos-modal-kubernetes-scale-resource.component';

describe('AnyopsosModalKubernetesScaleResourceComponent', () => {
  let component: AnyopsosModalKubernetesScaleResourceComponent;
  let fixture: ComponentFixture<AnyopsosModalKubernetesScaleResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalKubernetesScaleResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalKubernetesScaleResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
