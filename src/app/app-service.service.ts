import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Folder} from "./folder";
import {File} from "./file";

@Injectable()
export class AppService {

  onCurrentItemChanged: Subject<Folder | File>;

  constructor() {
    this.onCurrentItemChanged = new Subject();
  }

}
