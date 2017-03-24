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
  private expanded: boolean = false;

  constructor(private fileSystemService: FileSystemService) {
  }

  ngOnInit() {
    this.fileSystemService.getItemById(this.id).subscribe((response) => {
      this.folder = response.item;
    }, (err) => {
      console.log(err);
    });
  }

}
