import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryImageComponent } from './summary-image.component';

describe('SummaryImageComponent', () => {
  let component: SummaryImageComponent;
  let fixture: ComponentFixture<SummaryImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
