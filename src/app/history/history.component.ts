import { Component, OnInit } from '@angular/core';
import {HistoryService} from "../history.service";
import {FileSystemService} from "../file-system.service";
import {AppService} from "../app-service.service";

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  private isSending = false;

  constructor(private historyService: HistoryService, private fileSystemService: FileSystemService, private appService: AppService) { }

  ngOnInit() {
  }

  goBack() {
    let nextId = this.historyService.goBack();
    this.getItem(nextId, true);
  }

  goForward() {
    let nextId = this.historyService.goForward();
    this.getItem(nextId, false);
  }

  get hasBack() {
    return this.historyService.hasBack();
  }

  get hasForward() {
    return this.historyService.hasForward();
  }

  getItem(id: string, goesBack: boolean) {
    if (!this.isSending) {
      this.isSending = true;
      this.fileSystemService.getItemById(id).subscribe((response) => {
        if (response.success) {
          this.appService.onCurrentItemChanged.next(response.item);
        } else {
          this.isSending = false;
          this.historyService.deleteCurrentId(goesBack);
          if (goesBack) {
            this.goBack();
          } else {
            this.goForward();
          }
        }
      }, (error) => {
        alert(error);
      }, () => {
        this.isSending = false;
      });
    }
  }

}
