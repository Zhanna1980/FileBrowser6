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
export class FileComponent implements OnInit, OnDestroy {
  @Input() file: File;
  private onGotFileSubscription: Subscription;

  constructor(private fileSystemService: FileSystemService, private appService: AppService, private contextMenuService: ContextMenuService) { }

  ngOnInit() {

  }

  openFileEditor() {
    this.contextMenuService.hideMenu();
    this.fileSystemService.getItemById(this.file._id);
    this.onGotFileSubscription = this.fileSystemService.onGotItem.subscribe((response) => {
      if (response.success == true && this.file._id === response.item._id) {
        this.file = response.item;
        this.appService.onCurrentItemChanged.next(this.file);
        this.onGotFileSubscription.unsubscribe();
      }
    })
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

  }

  delete() {

  }

  ngOnDestroy() {
    if (this.onGotFileSubscription){
      this.onGotFileSubscription.unsubscribe();
    }
  }

}
