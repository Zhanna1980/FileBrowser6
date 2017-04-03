import {Component, OnDestroy, OnInit} from '@angular/core';
import {Folder} from "../folder";
import {AppService} from "../app-service.service";
import {FileSystemService} from "../file-system.service";
import {HistoryService} from "../history.service";
import {File} from "../file";
import {Subscription} from "rxjs";

@Component({
  selector: 'folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.scss']
})
export class FolderContentComponent implements OnInit, OnDestroy {

  currentFolder: Folder;
  currentFile: File;
  private onGotCurrentItem: Subscription;

  constructor(private fileSystemService: FileSystemService, private history: HistoryService, private appService: AppService ) { }

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
    console.log("in content");
  }

  ngOnDestroy() {
    if (this.onGotCurrentItem) {
      this.onGotCurrentItem.unsubscribe();
    }
  }

}
