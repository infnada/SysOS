import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyDockerComponent } from './body-docker.component';

describe('BodyDockerComponent', () => {
  let component: BodyDockerComponent;
  let fixture: ComponentFixture<BodyDockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyDockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyDockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
