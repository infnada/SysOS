import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedObjectsComponent } from './related-objects.component';

describe('RelatedObjectsComponent', () => {
  let component: RelatedObjectsComponent;
  let fixture: ComponentFixture<RelatedObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
