import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFromInputComponent } from './create-from-input.component';

describe('CreateFromInputComponent', () => {
  let component: CreateFromInputComponent;
  let fixture: ComponentFixture<CreateFromInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFromInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFromInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
