import { Injectable } from '@angular/core';
import {MenuData} from "./menu-data";

@Injectable()
export class ContextMenuService {
  isMenuActive = false;
  menuData: MenuData;

  constructor() { }

  showMenu(menuData: MenuData) {
    this.isMenuActive = true;
    this.menuData = menuData;
  }

  hideMenu() {
    this.isMenuActive = false;
    this.menuData = null;
  }

}


