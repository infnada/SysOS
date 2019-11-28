import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFromFileComponent } from './create-from-file.component';

describe('CreateFromFileComponent', () => {
  let component: CreateFromFileComponent;
  let fixture: ComponentFixture<CreateFromFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFromFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFromFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
