import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCardModule } from "ng-zorro-antd/card";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from "./base/base.module";
import { DashComponent } from './dash/dash.component';
import { CameraComponent } from './camera/camera.component';
import { BridgeComponent } from './bridge/bridge.component';
import { BridgeEditComponent } from './bridge/bridge-edit/bridge-edit.component'
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    CameraComponent,
    BridgeComponent,
    BridgeEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzInputModule,
    NzMessageModule,
    NzButtonModule,
    NzTableModule,
    NzTransferModule,
    ReactiveFormsModule,
    NzFormModule,
    NzPopconfirmModule,
    NzModalModule,
    NzTagModule,
    NzCardModule,
    NzInputNumberModule,
    NzIconModule,
    NzSelectModule,
    NzSpaceModule,
    NzSpinModule,
    FormsModule,
    NzDividerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BaseModule,
    NzLayoutModule,
    NzTreeModule,
    NzPaginationModule,
    NzDropDownModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/app/ipc/' },
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
