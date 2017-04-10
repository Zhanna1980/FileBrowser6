import { Component, OnInit } from '@angular/core';
import {Folder} from "../folder";
import {FileSystemService} from "../file-system.service";
import {AppService} from "../app-service.service";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs";

@Component({
  selector: 'folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['folder-tree.component.scss']
})
export class FolderTreeComponent implements OnInit {

  root: Folder;

  constructor(private fileSystemService: FileSystemService, private appService: AppService) { }

  ngOnInit() {
    this.fileSystemService.getItemById().subscribe((response) => {
      console.log("in tree");
      if (response.success) {
        this.root = response.item;
        this.appService.onCurrentItemChanged.next(this.root);
      } else {
        alert(response.message);
      }
    }, (error) => {
      alert(error);
    });
  }
}
