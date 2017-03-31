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
  private onGotRootSubscription: Subscription;

  constructor(private fileSystemService: FileSystemService, private appService: AppService) { }

  ngOnInit() {
    this.fileSystemService.getItemById();
    this.onGotRootSubscription = this.fileSystemService.onGotItem.subscribe((response) => {
        if (response.success == true) {
          this.root = response.item;
          this.appService.onCurrentItemChanged.next(this.root);
          console.log("in root subscription");
          this.onGotRootSubscription.unsubscribe();
        } else {
          alert("Root folder was not found");
        }
    })
  }

}
