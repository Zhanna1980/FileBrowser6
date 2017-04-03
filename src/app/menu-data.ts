export interface MenuData {
  menuEntries: MenuEntry[],
  menuPosition: MenuPosition
}

export interface MenuEntry {
  entryName: string,
  entryFunction: Function
}

export interface MenuPosition {
  left: string,
  top: string;
}
