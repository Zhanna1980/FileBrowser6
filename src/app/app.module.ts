import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FolderTreeComponent } from './folder-tree/folder-tree.component';
import { FolderComponent } from './folder/folder.component';
import { FolderContentComponent } from './folder-content/folder-content.component';
import { FileComponent } from './file/file.component';
import { HistoryComponent } from './history/history.component';
import { PathComponent } from './path/path.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { FileEditorComponent } from './file-editor/file-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderTreeComponent,
    FolderComponent,
    FolderContentComponent,
    FileComponent,
    HistoryComponent,
    PathComponent,
    ContextMenuComponent,
    FileEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
