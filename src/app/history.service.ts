import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HistoryService {
  private history: string[];
  private currentItemIndex: number;
  currentItemChanged: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.history = [];
    this.currentItemIndex = -1;
  }

  goBack (): string {
    if (this.hasBack()) {
      --this.currentItemIndex;
    }
    return this.getCurrent();
  }

  goForward (): string {
    if (this.hasForward()) {
      ++this.currentItemIndex;
    }
    return this.getCurrent();
  }

  onChange () {

  }

  /**
   * Adds item id to history
   */
  addState (id: string): void {
    if(this.currentItemIndex > -1 && this.getCurrent() == id) {
      return;
    }
    this.history.splice(++this.currentItemIndex, 0, id);
    this.history.splice(this.currentItemIndex + 1);
  }


  /**
   * Gets current item's id.
   * @return current item's id or undefined if the history is empty.
   * */
  getCurrent (): string {
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
