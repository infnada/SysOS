import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderExplorerBodyComponent } from './body.component';

describe('FolderExplorerBodyComponent', () => {
  let component: FolderExplorerBodyComponent;
  let fixture: ComponentFixture<FolderExplorerBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderExplorerBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderExplorerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
