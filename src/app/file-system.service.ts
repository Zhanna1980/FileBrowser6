import {Injectable, EventEmitter} from '@angular/core';
import {Folder} from "./folder";
import {File} from "./file";
import {Http, Response} from "@angular/http";
import {Observable, Subject} from "rxjs";

@Injectable()
export class FileSystemService {

  private readonly OWNER = "Zhanna";
  private readonly apiUrl = "http://hosting.webis.co.il:8085/api";
  onGotItem: Subject<any>;

  constructor (private http: Http) {
    this.onGotItem = new Subject();
  }

  // getItemById (id?: string) {
  //   return this.http.get(this.apiUrl + '/items/get/' + this.OWNER + '/' + (id !== undefined ? id : ''))
  //     .map((data: Response) => { return data.json(); })
  //     .catch((err: Response) => {
  //       return Observable.throw(err)
  //     });
  //
  // }

  getItemById(id?: string) {
    return this.http.get(this.apiUrl + '/items/get/' + this.OWNER + '/' + (id !== undefined ? id : ''))
      .subscribe((data: Response) => {
        const response = data.json();
        this.onGotItem.next(response);
      }, (err) => {
        console.log(err.message);
      });
  }

  // getMessages() {
  //   return this.http.get(this.url + "messages/" + this.id)
  //     .subscribe((data: Response) => {
  //       const dataMessages = data.json();
  //       this.onGotMessages.next(dataMessages);
  //     }, (err) => {
  //       this.onGotUsers.next([]);
  //     });
  // }


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
    let objectToSend = {
      "_id": item._id,
      "name": item.name,
      "owner": item.owner,
      "content": (item as File).content,
      "children": (item as Folder).children,
      "__v": 0
    };
    return this.http.post(this.apiUrl + '/items/update/' + item._id, objectToSend)
      .subscribe((data: Response) => {
        const response = data.json();
        this.onGotItem.next(response);
      }, (err) => {
        console.log(err.message);
      });
  }

  onChange () {

  }

  setPath (path: string) {

  }

  setCurrentId (id: string) {

  }
}

