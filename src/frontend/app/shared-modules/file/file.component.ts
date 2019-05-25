import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MatMenuTrigger} from "@angular/material";

import Selectable from 'selectable.js';

import {FileSystemService} from "../../services/file-system.service";
import {FileSystemUiService} from "../../services/file-system-ui.service";

import {File} from "../../interfaces/file";
import {ContextMenuItem} from "../../interfaces/context-menu-item";
import {Application} from "../../interfaces/application";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit, AfterViewInit {
  @ViewChild(MatMenuTrigger) contextMenuFile: MatMenuTrigger;
  @ViewChild('selectableFileElement') selectableFileElement: ElementRef;
  @Input() application: Application;
  @Input() file: File;
  @Input() isCurrentActive: boolean;
  @Input() currentPath: string;
  @Input() viewAsList: boolean;
  @Input() selectable: Selectable;
  @Input() selector: string;

  contextMenuPosition = {x: '0px', y: '0px'};

  onFileContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuFile.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem): boolean {
    if (item.disabled) return item.disabled();
    return false;
  }

  contextToText(item: ContextMenuItem, file?: File): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }

  fileContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: '<i class="fa fa-download"></i> Download to local', action: (file: File) => {
        // TODO
      }
    },
    {
      id: 2, text: (file: File) => {
        let filetype = this.getFileType(file.longname);

        if (filetype === 'folder') {
          return '<i class="fa fa-folder-open"></i> Open';
        } else {
          return '<i class="fa fa-edit"></i> Open with Notepad';
        }
      }, action: (file: File) => {
        this.UIdoWithFile(file);
      }
    },
    {id: 3, text: 'divider'},
    {
      id: 4, text: '<i class="fa fa-files-o"></i> Copy', action: (file: File) => {
        this.UIcopyFile(file);
      }
    },
    {
      id: 6, text: '<i class="fa fa-scissors"></i> Cut', action: (file: File) => {
        this.UIcutFile(file);
      }
    },
    {id: 7, text: 'divider'},
    {
      id: 8, text: '<i class="fa fa-font"></i> Rename', action: (file: File) => {
        return this.UIrenameFile(file);
      }
    },
    {
      id: 9, text: '<i class="fa fa-remove"></i> Delete', action: (file: File) => {
        return this.UIdeleteSelected(file);
      }
    },
    {id: 10, text: 'divider'},
    {
      id: 11, text: '<i class="fa fa-lock"></i> Permissions', action: (file: File) => {
        //TODO
      }
    }
  ];

  constructor(private FileSystemService: FileSystemService,
              private FileSystemUiService: FileSystemUiService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.selectable);
    this.selectable.add(this.selectableFileElement.nativeElement)
  }

  getFileType(longname: string): string {
    return this.FileSystemService.getFileType(longname);
  };

  UIrenameFile(file: File) {
    this.FileSystemUiService.UIrenameFile(this.currentPath, file, this.selector);
  };

  UIdeleteSelected(file: File) {
    this.FileSystemUiService.UIdeleteSelected(this.currentPath, file, this.selector);
  };

  UIcopyFile(file: File) {
    this.FileSystemUiService.UIcopyFile(this.currentPath, file);
  }

  UIcutFile(file: File) {
    this.FileSystemUiService.UIcutFile(this.currentPath, file);
  }

  UIdoWithFile(file: File) {
    this.FileSystemUiService.UIdoWithFile(this.application.id, this.currentPath, file);
  }

}
