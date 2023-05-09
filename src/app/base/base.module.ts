import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from '@angular/cdk/drag-drop'

import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { DatePipe } from "./date.pipe";
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { ExportComponent } from './export/export.component';
import { ImportComponent } from './import/import.component';
@NgModule({
  declarations: [
    DatePipe,
    PageNotFoundComponent,
    ToolbarComponent,
    SearchBoxComponent,
    CustomPaginationComponent,
    ExportComponent,
    ImportComponent,
  ],
  exports: [
    DatePipe,
    PageNotFoundComponent,
    ToolbarComponent,
    SearchBoxComponent,
    CustomPaginationComponent,
    ExportComponent,
    ImportComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    DragDropModule,
    NzSelectModule,
    NzTableModule,
    NzIconModule,
    NzSpaceModule,
    NzInputNumberModule
  ],
  providers: [

  ]
})
export class BaseModule {
}
