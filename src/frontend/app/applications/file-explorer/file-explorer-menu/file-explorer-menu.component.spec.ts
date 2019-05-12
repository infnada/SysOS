import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerMenuComponent } from './file-explorer-menu.component';

describe('FileExplorerMenuComponent', () => {
  let component: FileExplorerMenuComponent;
  let fixture: ComponentFixture<FileExplorerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExplorerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExplorerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
