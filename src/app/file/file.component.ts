import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {File} from '../file';
import {AppService} from "../app-service.service";
import {FileSystemService} from "../file-system.service";
import {Subscription} from "rxjs";
import {ContextMenuService} from "../context-menu.service";
import {MenuData} from "../menu-data";

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  @Input() file: File;
  private isSending = false;

  constructor(private fileSystemService: FileSystemService, private appService: AppService, private contextMenuService: ContextMenuService) { }

  openFileEditor() {
    this.contextMenuService.hideMenu();
    if (!this.isSending) {
      this.isSending = true;
      this.fileSystemService.getItemById(this.file._id).subscribe((response) => {
        if (response.success) {
          this.file = response.item;
          this.appService.onCurrentItemChanged.next(this.file);
        } else {
          alert(response.message);
        }
      }, (error) => {
        alert(error);
      }, () => {
        this.isSending = false;
      });
    }
  }

  onContextMenu(event) {
    event.stopPropagation();
    this.contextMenuService.showMenu(this.setContextMenuData(event));
    return false;
  }

  setContextMenuData(event): MenuData {
    return {
      menuEntries: [{entryName: "Rename", entryFunction: () => this.rename()},
        {entryName: "Delete", entryFunction: () => this.delete()}
      ],
      menuPosition: {left: event.clientX + "px", top: event.clientY + "px"}
    }
  }

  rename() {
    let itemName = prompt("Please enter the name for folder/file", this.file.name);
    if (itemName === null) {
      return;
    }
    this.fileSystemService.updateItem(this.file, itemName).subscribe((response) => {
      if (response.success) {
        this.file = response.item;
      } else {
        alert (response.message);
      }
    }, (error) => {
      alert(error);
    });
  }

  delete() {
    this.fileSystemService.deleteItem(this.file._id);
  }

}
