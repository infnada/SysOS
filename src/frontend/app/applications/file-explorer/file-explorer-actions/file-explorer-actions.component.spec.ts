import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerActionsComponent } from './file-explorer-actions.component';

describe('FileExplorerActionsComponent', () => {
  let component: FileExplorerActionsComponent;
  let fixture: ComponentFixture<FileExplorerActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExplorerActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExplorerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
