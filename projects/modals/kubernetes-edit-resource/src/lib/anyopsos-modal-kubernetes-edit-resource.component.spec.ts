import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalKubernetesEditResourceComponent } from './anyopsos-modal-kubernetes-edit-resource.component';

describe('AnyopsosModalKubernetesEditResourceComponent', () => {
  let component: AnyopsosModalKubernetesEditResourceComponent;
  let fixture: ComponentFixture<AnyopsosModalKubernetesEditResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalKubernetesEditResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalKubernetesEditResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
