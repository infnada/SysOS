import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedTextComponent } from './matched-text.component';

describe('MatchedTextComponent', () => {
  let component: MatchedTextComponent;
  let fixture: ComponentFixture<MatchedTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
