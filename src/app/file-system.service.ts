import {Injectable, EventEmitter} from '@angular/core';
import {Folder} from "./folder";
import {File} from "./file";

@Injectable()
export class FileSystemService {

  constructor () { }

  getItemById (id?: number) {

  }

  createItem (item: File | Folder, parentId: number) {

  }

  deleteItem (id: number) {

  }

  updateItem (item: File | Folder) {

  }

  onChange () {

  }

  setPath (path: string) {

  }

  setCurrentId (id: number) {

  }
}
