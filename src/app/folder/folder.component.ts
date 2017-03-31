import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FileSystemService} from "../file-system.service";
import {Folder} from "../folder";
import {HistoryService} from "../history.service";
import {AppService} from "../app-service.service";
import {Subscription} from "rxjs";

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


  constructor(private fileSystemService: FileSystemService, private appService: AppService ) {

  }

  ngOnInit() {
    if (this.isInTree){
      this.expandSign = "+";
    }
  }

  onFolderImageClick(event: Event) {
    event.stopPropagation();
    this.expanded=!this.expanded;
    this.expandSign = this.expanded ? "-" : "+";
    if (this.isInTree && this.expanded){
      this.getFolder();
    } else {
      this.onFolderNameClick(event);
    }
  }

  onFolderNameClick(event: Event) {
    event.stopPropagation();
    this.getFolder(() => {
      this.appService.onCurrentItemChanged.next(this.folder);
    });
  }

  getFolder(callback?: Function) {
    this.fileSystemService.getItemById(this.folder._id);
    this.onGotFolderSubscription = this.fileSystemService.onGotItem.subscribe((response) => {
      if (response.success == true && this.folder._id === response.item._id) {
        this.folder = response.item;
        if (callback) {
          callback();}
      }
    })
  }

  ngOnDestroy() {
    if (this.onGotFolderSubscription){
      this.onGotFolderSubscription.unsubscribe();
    }
  }

}
