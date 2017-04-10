import {Component, OnDestroy, OnInit} from '@angular/core';
import {Folder} from "../folder";
import {File} from "../file";
import {Subscription} from "rxjs";
import {AppService} from "../app-service.service";

@Component({
  selector: 'path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss']
})

export class PathComponent implements OnInit, OnDestroy {
  private currentItem: File | Folder;
  private onGotCurrentItem: Subscription;
  private onGotItem: Subscription;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.onGotCurrentItem = this.appService.onCurrentItemChanged.subscribe((item: Folder | File) => {
      this.currentItem = item;
    });
    this.onGotItem = this.appService.onGotItem.subscribe((item: Folder | File) => {
      if (item._id == this.currentItem._id) {
        this.currentItem = item;
      }
    });
  }
  ngOnDestroy() {
    if (this.onGotCurrentItem) {
      this.onGotCurrentItem.unsubscribe();
    }
    if (this.onGotItem) {
      this.onGotItem.unsubscribe();
    }
  }

}
