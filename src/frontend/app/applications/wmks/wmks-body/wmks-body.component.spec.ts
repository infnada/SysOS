import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WmksBodyComponent } from './wmks-body.component';

describe('WmksBodyComponent', () => {
  let component: WmksBodyComponent;
  let fixture: ComponentFixture<WmksBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmksBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmksBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
