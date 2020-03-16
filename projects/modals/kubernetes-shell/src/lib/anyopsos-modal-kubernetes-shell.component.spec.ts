import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalKubernetesShellComponent } from './anyopsos-modal-kubernetes-shell.component';

describe('AnyopsosModalKubernetesShellComponent', () => {
  let component: AnyopsosModalKubernetesShellComponent;
  let fixture: ComponentFixture<AnyopsosModalKubernetesShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalKubernetesShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalKubernetesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
