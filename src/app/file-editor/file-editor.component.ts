import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {File} from "../file";
import {FileSystemService} from "../file-system.service";
import {AppService} from "../app-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.scss']
})
export class FileEditorComponent implements OnDestroy {
  @Input() file: File;
  onGotFileSubscription: Subscription;

  constructor(private fileSystemService: FileSystemService, private appService: AppService) {

  }

  cancelEditing() {
    this.appService.isFileEditorActive = false;
  }

  saveEditedContent() {
    this.fileSystemService.updateItem(this.file);
    this.onGotFileSubscription = this.fileSystemService.onGotItem.subscribe((response) => {
      if (response.success == true && this.file._id === response.item._id) {
        this.file = response.item;
        this.appService.isFileEditorActive = false;
        this.onGotFileSubscription.unsubscribe();
      }
    })
  }

  onContextMenu(event) {
    event.stopPropagation();
    return false;
  }

  ngOnDestroy() {
    if (this.onGotFileSubscription){
      this.onGotFileSubscription.unsubscribe();
    }
  }

}
