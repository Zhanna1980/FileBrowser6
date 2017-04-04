import {Component, OnDestroy, OnInit} from '@angular/core';
import {Folder} from "../folder";
import {AppService} from "../app-service.service";
import {FileSystemService} from "../file-system.service";
import {HistoryService} from "../history.service";
import {File} from "../file";
import {Subscription} from "rxjs";
import {ContextMenuService} from "../context-menu.service";
import {MenuData} from "../menu-data";

@Component({
  selector: 'folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.scss']
})
export class FolderContentComponent implements OnInit, OnDestroy {

  currentFolder: Folder;
  currentFile: File;
  private onGotCurrentItem: Subscription;

  constructor(private fileSystemService: FileSystemService, private history: HistoryService, private appService: AppService,
  private contextMenuService: ContextMenuService) { }

  ngOnInit() {
    this.onGotCurrentItem = this.appService.onCurrentItemChanged.subscribe((item: Folder | File)=> {
      if (item.hasOwnProperty('children')) {
        this.currentFolder = item as Folder;
        this.isFileEditorActive = false;
        this.currentFile = undefined;
      } else {
        this.currentFile = item as File;
        this.isFileEditorActive = true;
      }

    });
  }

  get isFileEditorActive() {
    return this.appService.isFileEditorActive;
  }

  set isFileEditorActive(isActive: boolean) {
    this.appService.isFileEditorActive = isActive;
  }

  onContextMenu(event) {
    event.stopPropagation();
    this.contextMenuService.showMenu(this.setContextMenuData(event));
    return false;
  }

  setContextMenuData(event): MenuData {
      return {
        menuEntries: [{entryName: "New folder", entryFunction: () => this.newFolder()},
          {entryName: "New file", entryFunction: () => this.newFile()}
        ],
        menuPosition: {left: event.clientX + "px", top: event.clientY + "px"}
      }
  }

  newFolder() {
    console.log(this.currentFolder);
  }

  newFile() {

  }


  ngOnDestroy() {
    if (this.onGotCurrentItem) {
      this.onGotCurrentItem.unsubscribe();
    }
  }

}
