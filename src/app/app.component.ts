import {Component, OnInit} from '@angular/core';
import {ContextMenuService} from "./context-menu.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  host: {
    "(click)":"hideMenu()"
  }
})
export class AppComponent {

  constructor(private contextMenuService: ContextMenuService) {

  }

  hideMenu() {
    this.contextMenuService.hideMenu();
  }
}
