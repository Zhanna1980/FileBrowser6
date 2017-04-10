import {Injectable, EventEmitter} from '@angular/core';
import {Folder} from "./folder";
import {File} from "./file";
import {Http, Response} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {AppService} from "./app-service.service";

@Injectable()
export class FileSystemService {

  private readonly OWNER = "Zhanna";
  private readonly apiUrl = "http://hosting.webis.co.il:8085/api";


  constructor (private http: Http, private appService: AppService) {

  }

  getItemById(id?: string) {
    return this.http.get(this.apiUrl + '/items/get/' + this.OWNER + '/' + (id !== undefined ? id : ''))
      .map((data: Response) => { return data.json(); })
      .catch((err: Response) => {
        return Observable.throw("Failed to fetch data.");
      });

  }

  createItem (parentId: string, type: string, name: string) {
    return this.http.post(this.apiUrl + '/items/create/', { parentId: parentId, type: type, name: name, owner: this.OWNER })
      .map((data: Response) => { return data.json(); })
      .catch((err: Response) => {
        return Observable.throw("Failed to connect with server.");
      });
  }

  deleteItem (id: string) {
    const userConfirmed = confirm("Are you sure?");
    if (!userConfirmed) {
      return;
    }
      return this.http.get(this.apiUrl + '/items/delete/' + id)
        .subscribe((data: Response) => {
          const response = data.json();
          if (response.success == true) {
            this.getItemById(response.parentId).subscribe((response) => {
              if (response.success) {
                this.appService.onGotItem.next(response.item);
              } else {
                alert(response.message);
              }
            }, (error) => {
              alert("Failed to connect with server while getting parent folder.");
            });
          } else {
            alert(response.message);
          }
        }, (err) => {
          alert("Failed to connect with server.");
        });
  }

  updateItem (item: File | Folder, newName?: string) {
    let objectToSend = {
      "_id": item._id,
      "name": item.name,
      "owner": item.owner,
      "content": (item as File).content,
      "children": (item as Folder).children,
      "__v": 0
    };
    if (newName) {
      objectToSend.name = newName;
    }
    return this.http.post(this.apiUrl + '/items/update/' + item._id, objectToSend)
      .map((data: Response) => { return data.json(); })
      .catch((err: Response) => {
        return Observable.throw("Failed to connect with server");
      });
  }
}

