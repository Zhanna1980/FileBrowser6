import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Folder} from "./folder";
import {File} from "./file";

@Injectable()
export class AppService {

  onCurrentItemChanged: Subject<Folder | File>;
  isFileEditorActive = false;

  constructor() {
    this.onCurrentItemChanged = new Subject();
  }

  // get isFileEditorOpened(): boolean {
  //   return this.isFileEditorActive;
  // }

}
