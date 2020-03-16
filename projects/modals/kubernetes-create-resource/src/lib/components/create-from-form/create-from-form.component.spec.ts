import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFromFormComponent } from './create-from-form.component';

describe('CreateFromFormComponent', () => {
  let component: CreateFromFormComponent;
  let fixture: ComponentFixture<CreateFromFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFromFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFromFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
