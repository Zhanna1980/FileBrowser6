import {Injectable, EventEmitter} from '@angular/core';
import {Folder} from "./folder";
import {File} from "./file";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class FileSystemService {

  private readonly OWNER = "Zhanna";
  private readonly apiUrl = "http://hosting.webis.co.il:8085/api";

  constructor (private http: Http) { }

  getItemById (id?: string) {
    return this.http.get(this.apiUrl + '/items/get/' + this.OWNER + '/' + (id !== undefined ? id : ''))
      .map((data: Response) => { return data.json(); })
      .catch((err: Response) => {
        return Observable.throw(err)
      });

  }

  createItem (parentId: string, type: string, name: string) {
    return this.http.post(this.apiUrl + '/items/create/', { parentId: parentId, type: type, name: name, owner: this.OWNER })
      .map((data: Response) => { return data.json(); })
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  deleteItem (id: string) {

  }

  updateItem (item: File | Folder) {

  }

  onChange () {

  }

  setPath (path: string) {

  }

  setCurrentId (id: string) {

  }
}

