import { Component } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzModalRef, NzModalService, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import * as WebRtcStreamer from 'src/assets/webrtcstreamer';
import { CameraComponent } from '../camera/camera.component';
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
  ) {
    const children: any = [];
    for (let index = 0; index < 20; index++) {
      children.push({
        title: `监控${index + 1}`,
        key: `0-${index + 1}`,
        isLeaf: true
      })
    }
    this.nodes[0].children = children;
    this.checkedKeys = children;
    this.setNzSpan();//默认显示4宫格
    this.handlePageIndexChange(1);
    this.connect();
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
      // this.webRtcServer = new WebRtcStreamer("video0", "http://192.168.2.8:8000");
      // this.webRtcServer.connect('rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4', options);
    }
    window.onbeforeunload = () => { this.webRtcServer.disconnect() }
  }
  handleEdit(data?: any) {
    const nzTitle = data ? `编辑【${data.title}】` : '新增';
    this.modal.create<CameraComponent>({
      nzTitle,
      nzContent: CameraComponent,
      nzOnOk: (componentInstance) => {
        const sendData = componentInstance.validateForm.value;
        console.log(sendData)
      },
    });
  }
  handleDel(origin: any) {
    this.modal.confirm({
      nzTitle: '提示',
      nzContent: `确定删除【${origin.title}】`,
      nzOnOk: () => console.log('OK')
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
