import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalKubernetesCreateResourceComponent } from './anyopsos-modal-kubernetes-create-resource.component';

describe('AnyopsosModalKubernetesCreateResourceComponent', () => {
  let component: AnyopsosModalKubernetesCreateResourceComponent;
  let fixture: ComponentFixture<AnyopsosModalKubernetesCreateResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalKubernetesCreateResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalKubernetesCreateResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
