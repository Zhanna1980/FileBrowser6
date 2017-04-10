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
  private isSending = false;

  constructor(private fileSystemService: FileSystemService, private appService: AppService) {

  }

  cancelEditing() {
    this.appService.isFileEditorActive = false;
  }

  saveEditedContent() {
    if (!this.isSending) {
      this.isSending = true;
      this.fileSystemService.updateItem(this.file).subscribe((response) => {
        if (response.success) {
          this.file = response.item;
          this.appService.isFileEditorActive = false;
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
    return false;
  }

  ngOnDestroy() {
  }

}
