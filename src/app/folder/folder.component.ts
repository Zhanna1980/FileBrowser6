import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FileSystemService} from "../file-system.service";
import {Folder} from "../folder";
import {HistoryService} from "../history.service";
import {AppService} from "../app-service.service";
import {Subscription} from "rxjs";
import {ContextMenuService} from "../context-menu.service";
import {MenuData, MenuEntry} from "../menu-data";

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit, OnDestroy {

  @Input() folder: Folder;
  @Input() shouldShowName = true;
  @Input() isInTree = false;
  private expanded: boolean = false;
  private expandSign: string = "";
  private onGotFolderSubscription: Subscription;
  private isSending = false;

  constructor(private fileSystemService: FileSystemService, private appService: AppService, private contextMenuService: ContextMenuService) {

  }

  ngOnInit() {
    if (this.isInTree) {
      this.expandSign = "+";
    }
    this.onGotFolderSubscription = this.appService.onGotItem.subscribe((item) => {
      if (item._id == this.folder._id) {
        this.folder = item;
      }
      if (this.isInTree && this.appService.treeState.hasOwnProperty(this.folder._id)) {
        this.expanded = this.appService.treeState[this.folder._id];
        console.log(this.folder.name + " " + this.expanded);
      }
    });
  }

  onFolderImageClick(event: Event) {
    event.stopPropagation();
    if (this.isInTree) {
      this.contextMenuService.hideMenu();
      this.expanded=!this.expanded;
      this.appService.treeState[this.folder._id] = this.expanded;
      this.expandSign = this.expanded ? "-" : "+";
      if (this.expanded) {
        this.getFolder();
      }
    } else {
      this.onFolderNameClick(event);
    }
  }

  onFolderNameClick(event: Event) {
    event.stopPropagation();
    this.contextMenuService.hideMenu();
    this.getFolder(() => {
      this.appService.onCurrentItemChanged.next(this.folder);
    });
  }

  onContextMenu(event) {
    event.stopPropagation();
    this.contextMenuService.showMenu(this.setContextMenuData(event));
    return false;
  }

  setContextMenuData(event): MenuData {
    const menuPosition = {
      left: event.clientX + "px",
      top: event.clientY + "px"
    };
    if (this.folder.name == "root") {
      return {
        menuEntries: [{entryName: "New folder", entryFunction: () => this.newFolder()},
          {entryName: "New file", entryFunction: () => this.newFile()}
        ],
        menuPosition: menuPosition
      }
    } else {
      return {
            menuEntries: [{entryName: "New folder", entryFunction: () => this.newFolder()},
              {entryName: "New file", entryFunction: () => this.newFile()},
              {entryName: "Rename", entryFunction: () => this.rename()},
              {entryName: "Delete", entryFunction: () => this.delete()}
            ],
              menuPosition: menuPosition
          }
    }
  }

  newFolder() {
    this.newSubItem("folder");
  }

  newFile() {
    this.newSubItem("file");
  }

  newSubItem(type: string) {
    let itemName = prompt("Please enter the name for folder/file");
    if (itemName === null) {
      return;
    }
    this.fileSystemService.createItem(this.folder._id, type, itemName).subscribe((response) => {
      if (response.success) {
        this.getFolder();
      } else {
        alert (response.message);
      }
    }, (error) => {
      alert(error);
    });
  }

  rename() {
    let itemName = prompt("Please enter a new name for the folder", this.folder.name);
    if (itemName === null) {
      return;
    }
    this.fileSystemService.updateItem(this.folder, itemName).subscribe((response) => {
      if (response.success) {
        this.folder = response.item;
        this.appService.onGotItem.next(this.folder);
      } else {
        alert (response.message);
      }
    }, (error) => {
      alert(error);
    });
  }

  delete() {
    this.fileSystemService.deleteItem(this.folder._id);
  }

  getFolder(callback?: Function) {
    if (!this.isSending) {
      this.isSending = true;
      this.fileSystemService.getItemById(this.folder._id).subscribe((response) => {
        if (response.success) {
          this.folder = response.item;
          // if (this.isInTree && this.appService.treeState.hasOwnProperty(this.folder._id)) {
          //   this.expanded = this.appService.treeState[this.folder._id];
          //   console.log(this.folder.name + " " + this.expanded);
          // }
          this.appService.onGotItem.next(this.folder);
          if (callback) {
            callback();
          }
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

  ngOnDestroy() {
    if (this.onGotFolderSubscription){
      this.onGotFolderSubscription.unsubscribe();
    }
    // if (this.isInTree) {
    //   this.appService.treeState[this.folder._id] = this.expanded;
    //   console.log("save state", this.expanded);
    // }
  }

}
