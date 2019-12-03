import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBoxComponent } from './notice-box.component';

describe('NoticeBoxComponent', () => {
  let component: NoticeBoxComponent;
  let fixture: ComponentFixture<NoticeBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
