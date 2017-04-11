import { Injectable } from '@angular/core';
import {AppService} from "./app-service.service";
import {Subscription} from "rxjs";
import {Folder} from "./folder";
import {File} from "./file";


@Injectable()
export class HistoryService {
  private history: string[];
  private currentItemIndex: number;
  private onGotCurrentItem: Subscription;

  constructor(private appService: AppService) {
    this.history = [];
    this.currentItemIndex = -1;
    this.onGotCurrentItem = this.appService.onCurrentItemChanged.subscribe((item: Folder | File) => {
      this.addState(item._id);
    });
  }

  goBack (): string {
    if (this.hasBack()) {
      --this.currentItemIndex;
    }
    return this.currentId;
  }

  goForward (): string {
    if (this.hasForward()) {
      ++this.currentItemIndex;
    }
    return this.currentId;
  }

  /**
   * Adds item id to history
   */
  addState (id: string): void {
    if(this.currentItemIndex > -1 && this.currentId == id) {
      return;
    }
    this.history.splice(++this.currentItemIndex, 0, id);
    this.history.splice(this.currentItemIndex + 1);
  }

  /**
   * Removes from the history id at current index.
   * @param goesBack - Boolean which determines how to change the current index after removing.
   * */
  deleteCurrentId(goesBack: boolean) {
    this.history.splice(this.currentItemIndex, 1);
    if (!goesBack) {
      this.currentItemIndex--;
    }
  }


  /**
   * Gets current item's id.
   * @return current item's id or undefined if the history is empty.
   * */
  get currentId (): string {
    if (this.currentItemIndex > -1 && this.currentItemIndex < this.history.length) {
      return this.history[this.currentItemIndex];
    } else {
      return undefined;
    }
  }

  /**
   * Return true if there is history back from current item
   * */
  hasBack (): boolean {
    return this.currentItemIndex > 0;
  }

  /**
   * Return true if there is history forward from current item
   */
  hasForward (): boolean {
    return this.currentItemIndex < this.history.length - 1;
  }

}
