import {Component, Input, OnInit} from '@angular/core';
import {FileSystemService} from "../file-system.service";
import {Folder} from "../folder";
import {HistoryService} from "../history.service";
import {AppService} from "../app-service.service";

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  private folder: Folder;
  @Input() id?: string;
  @Input() expandable: boolean = false;
  private expanded: boolean = false;
  private expandSign: string = "";

  constructor(private fileSystemService: FileSystemService, private history: HistoryService, private appService: AppService) {
  }

  ngOnInit() {
    if (this.expandable) {
      this.expandSign = "+";
    }
    this.getFolder();
  }

  onFolderImageClick() {
    if (this.expandable) {
      this.expanded=!this.expanded;
      this.expandSign = this.expanded ? "-" : "+";
    }
  }

  onFolderNameClick() {
    this.appService.onCurrentItemChanged.next(this.folder);
  }

  getFolder() {
    this.fileSystemService.getItemById(this.id).subscribe((response) => {
      this.folder = response.item;
    }, (err) => {
      console.log(err);
    });
  }

}
