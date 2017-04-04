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

  private readonly newFolderMenuEntry: MenuEntry;
  private readonly newFileMenuEntry: MenuEntry;
  private readonly renameMenuEntry: MenuEntry;
  private readonly deleteMenuEntry: MenuEntry;


  constructor(private fileSystemService: FileSystemService, private appService: AppService, private contextMenuService: ContextMenuService) {

  }

  ngOnInit() {
    if (this.isInTree){
      this.expandSign = "+";
    }
  }

  onFolderImageClick(event: Event) {
    event.stopPropagation();
    if (this.isInTree) {
      this.contextMenuService.hideMenu();
      this.expanded=!this.expanded;
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
    console.log(this.folder);
  }

  newFile() {

  }

  rename() {

  }

  delete() {

  }

  getFolder(callback?: Function) {
    this.fileSystemService.getItemById(this.folder._id);
    this.onGotFolderSubscription = this.fileSystemService.onGotItem.subscribe((response) => {
      if (response.success == true && this.folder._id === response.item._id) {
        this.folder = response.item;
        if (callback) {
          callback();
        }
        this.onGotFolderSubscription.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    if (this.onGotFolderSubscription){
      this.onGotFolderSubscription.unsubscribe();
    }
  }

}
