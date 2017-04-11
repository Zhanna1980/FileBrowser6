import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Folder} from "./folder";
import {File} from "./file";

@Injectable()
export class AppService {

  onCurrentItemChanged: Subject<Folder | File>;
  onGotItem: Subject<any>;
  isFileEditorActive = false;
  //treeState is needed to save the state of tree after reloading folders. The state is preserved at the form id: expanded.
  treeState: Object;

  constructor() {
    this.onCurrentItemChanged = new Subject();
    this.onGotItem = new Subject();
    this.treeState = {};
  }

}
