import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyNewProjectComponent } from './body-new-project.component';

describe('BodyNewProjectComponent', () => {
  let component: BodyNewProjectComponent;
  let fixture: ComponentFixture<BodyNewProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyNewProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyNewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
