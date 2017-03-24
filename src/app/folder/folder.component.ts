import {Component, Input, OnInit} from '@angular/core';
import {FileSystemService} from "../file-system.service";
import {Folder} from "../folder";

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

  constructor(private fileSystemService: FileSystemService) {
  }

  ngOnInit() {
    if (this.expandable) {
      this.expandSign = "+";
    }
    this.fileSystemService.getItemById(this.id).subscribe((response) => {
      this.folder = response.item;
    }, (err) => {
      console.log(err);
    });
  }

  onFolderImageClick(){
    if (this.expandable) {
      this.expanded=!this.expanded;
      this.expandSign = this.expanded ? "-" : "+";
    }
  }

}
