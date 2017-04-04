import { Component, OnInit } from '@angular/core';
import {MenuData} from "../menu-data";
import {ContextMenuService} from "../context-menu.service";

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  constructor(private contextMenuService: ContextMenuService) { }

  ngOnInit() {
  }

  get isMenuActive() {
    return this.contextMenuService.isMenuActive;
  }

  get menuData() {
    return this.contextMenuService.menuData;
  }

}
