import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerBodyComponent } from './file-explorer-body.component';

describe('FileExplorerBodyComponent', () => {
  let component: FileExplorerBodyComponent;
  let fixture: ComponentFixture<FileExplorerBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExplorerBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExplorerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
