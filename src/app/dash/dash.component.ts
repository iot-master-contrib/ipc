import { Component } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzModalRef, NzModalService, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { CameraComponent } from '../camera/camera.component';
import { RequestService } from '../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
declare var WebRtcStreamer: any;
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {
  nodes = [
    {
      title: '监控管理',
      expanded: true,
      key: '0',
      children: []
    }
  ]
  defaultCheckedKeys = ['0'];
  checkedKeys: any = [];
  showCheckedKeys: any = [];
  nzSpan = 12;
  pageIndex = 1;
  FOUR_GRID = 4;
  NINE_GRID = 9;
  gridType = 4;
  webrtcConfig = {
    options: "rtptransport=tcp&timeout=60",
  }
  webRtcServer: any = {};
  constructor(
    private modal: NzModalService,
    private rs: RequestService,
    private msg: NzMessageService,
  ) {
    this.load();
  }
  load() {
    this.rs.get('camera/list').subscribe((res) => {
      if (!res.data) {
        return;
      }
      const children: any = [];
      for (let index = 0; index < res.data.length; index++) {
        const item = res.data[index];
        children.push({
          title: item.name,
          key: item.id,
          isLeaf: true,
          ...item
        })
      }
      this.nodes = [{
        title: '监控管理',
        expanded: true,
        key: '0',
        children
      }];
      this.defaultCheckedKeys = [this.nodes[0].key];
      this.checkedKeys = children;
      this.setNzSpan();//默认显示4宫格
      this.handlePageIndexChange(1);
      this.connect();
    });
  }
  handleChecked(data: NzFormatEmitEvent): void {
    const arr = data.checkedKeys!.map((item) => item.origin);
    this.checkedKeys = arr;
    this.handlePageIndexChange(1);
  }
  handlePageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.showCheckedKeys = this.checkedKeys.slice((pageIndex - 1) * this.gridType, pageIndex * this.gridType);
  }
  setNzSpan() {
    // 4宫格col=12，9宫格col=8
    this.nzSpan = this.gridType === this.NINE_GRID ? 8 : 12;
  }
  connect() {
    const { webrtcConfig } = this;
    let options = webrtcConfig.options;
    window.onload = () => {
      this.webRtcServer = new WebRtcStreamer("video0", "http://192.168.2.8:8030");
      this.webRtcServer.connect('rtsp://stream.strba.sk:1935/strba/VYHLAD_JAZERO.stream', "", options);
    }
    window.onbeforeunload = () => { this.webRtcServer.disconnect() }
  }
  handleEdit(data?: any) {
    const nzTitle = data ? `编辑【${data.title}】` : '新增';
    const modal: NzModalRef = this.modal.create<CameraComponent>({
      nzTitle,
      nzContent: CameraComponent,
      nzComponentParams: {
        id: data ? data.id : ''
      },
      nzFooter: [{
        label: '取消',
        onClick: () => {
          modal.destroy();
        }
      }, {
        label: '保存',
        type: 'primary',
        onClick: componentInstance => {
          const { value, valid } = componentInstance!.validateForm;
          if (valid) {
            let url = data ? `camera/${value.id}` : `camera/create`;
            this.rs.post(url, value).subscribe((res) => {
              if (res.error) {
                this.msg.error(res.error);
              } else {
                this.msg.success('保存成功');
                this.load();
                modal.destroy();
              }
            })
          }
        }
      }]
    });
  }
  handleDel(origin: any) {
    this.modal.confirm({
      nzTitle: '提示',
      nzContent: `确定删除【${origin.title}】？`,
      nzOnOk: () => {
        this.rs.get(`camera/${origin.id}/delete`).subscribe((res) => {
          this.msg.success('删除成功');
          this.load();
        });
      }
    });
  }
  handleChangeGrid(gridType: number) {
    if (this.gridType === gridType) {
      return;
    }
    this.gridType = gridType;
    this.setNzSpan();
    this.handlePageIndexChange(1);
  }
}
