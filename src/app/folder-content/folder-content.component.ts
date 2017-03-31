import { Component, OnInit } from '@angular/core';
import {Folder} from "../folder";
import {AppService} from "../app-service.service";
import {FileSystemService} from "../file-system.service";
import {HistoryService} from "../history.service";
import {File} from "../file";

@Component({
  selector: 'folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.scss']
})
export class FolderContentComponent implements OnInit {

  currentItem: Folder | File;

  constructor(private fileSystemService: FileSystemService, private history: HistoryService, private appService: AppService ) { }

  ngOnInit() {
    this.appService.onCurrentItemChanged.subscribe((item: Folder | File)=> {
      this.currentItem = item;
    });
  }

}
