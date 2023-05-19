import { NumberFormatStyle } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ParseTableQuery } from '../base/table';
import { RequestService } from '../request.service';
import { BridgeEditComponent } from '../bridge-edit/bridge-edit.component';
@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.scss']
})
export class BridgeComponent {
  loading = true
  datum: any[] = []
  total = 1;
  pageSize = 20;
  pageIndex = 1;
  query: any = {}
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  delResData: any = [];
  href!: string;
  constructor(
    private modal: NzModalService,
    private router: Router,
    private rs: RequestService,
    private msg: NzMessageService
  ) { }

  reload() {
    this.datum = [];
    this.load()
  }

  load() {
    this.loading = true
    this.rs.post("bridge/search", this.query).subscribe(res => {
      this.datum = res.data || [];
      this.total = res.total;
    }).add(() => {
      this.loading = false;
    })
  }
  delete(id: NumberFormatStyle) {
    this.rs.get(`bridge/${id}/delete`).subscribe(res => {
      if (res.error) {
        this.msg.error(res.error);
      } else {
        this.msg.success("删除成功");
        this.load();
      }
    })
  }

  onQuery($event: NzTableQueryParams) {
    ParseTableQuery($event, this.query)
    this.load();
  }
  pageIndexChange(pageIndex: number) {
    this.query.skip = pageIndex - 1;
  }
  pageSizeChange(pageSize: number) {
    this.query.limit = pageSize;
  }
  search($event: string) {
    this.query.keyword = {
      name: $event
    };
    this.query.skip = 0;
    this.load();
  }

  handleEdit(id?: string) {
    const nzTitle = id ? "编辑" : "创建";
    const modal: NzModalRef = this.modal.create({
      nzTitle,
      nzStyle: { top: '20px' },
      nzContent: BridgeEditComponent,
      nzComponentParams: { id },
      nzFooter: [
        {
          label: '取消',
          onClick: () => {
            modal.destroy();
          }
        },
        {
          label: '保存',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance!.submit().then(() => {
              modal.destroy();
              this.load();
            }, () => { })
          }
        }
      ]
    });
  }
  cancel() {
    this.msg.info('取消操作');
  }
}
