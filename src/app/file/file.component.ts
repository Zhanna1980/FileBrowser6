import {Component, Input, OnInit} from '@angular/core';
import {File} from '../file';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input() file: File;

  constructor() { }

  ngOnInit() {
  }

}
