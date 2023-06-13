import { Component } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CameraEditComponent } from '../camera-edit/camera-edit.component';
import { RequestService } from '../request.service';
import { NzMessageService } from 'ng-zorro-antd/message';
declare var WebRtcStreamer: any;
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {
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
  gridType = JSON.parse(localStorage.getItem('grid_type') || '4');
  webrtcConfig = {
    options: "rtptransport=tcp&timeout=60",
  }
  webRtcServerArr: any = [];
  constructor(
    private modal: NzModalService,
    private rs: RequestService,
    private msg: NzMessageService,
  ) {
    this.load();
  }
  load() {
    this.webRtcServerArr = [];
    this.rs.get('camera/list', { limit: 99999 }).subscribe((res) => {
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
    });
  }
  handleChecked({ keys, checkedKeys }: NzFormatEmitEvent): void {
    let checked = checkedKeys;
    if (keys!.length === 1 && keys?.includes('0')) {
      checked = checkedKeys && checkedKeys[0] && checkedKeys[0].children;
    }
    const arr = checked!.map((item) => item.origin);
    this.checkedKeys = arr;
    this.handlePageIndexChange(1);
  }
  handlePageIndexChange(pageIndex: number) {
    this.clearConnect();
    this.pageIndex = pageIndex;
    this.showCheckedKeys = this.checkedKeys.slice((pageIndex - 1) * this.gridType, pageIndex * this.gridType);
    this.connect();
  }
  setNzSpan() {
    // 4宫格col=12，9宫格col=8
    this.nzSpan = this.gridType === this.NINE_GRID ? 8 : 12;
  }
  connect() {
    console.log('---connect----')
    if (!this.showCheckedKeys.length) return;
    console.log(this.showCheckedKeys)
    const options = this.webrtcConfig.options;
    const interval = setInterval(() => {
      const id = this.showCheckedKeys[0].id;
      const video = document.getElementById(`video${id}`);
      if (video) {
        clearInterval(interval);
        for (let index = 0; index < this.showCheckedKeys.length; index++) {
          const item = this.showCheckedKeys[index];
          const itemWebrtc = new WebRtcStreamer(`video${item.id}`, item.webrtc_streamer)
          itemWebrtc.connect(item.url, "", options);
          this.webRtcServerArr.push(itemWebrtc);
        }
      }
    }, 10);
    window.onbeforeunload = () => {
      this.clearConnect();
    }
  }
  clearConnect() {
    this.webRtcServerArr.forEach((element: { disconnect: () => void; }) => {
      element.disconnect();
    });
    this.webRtcServerArr = [];
  }
  handleEdit(data?: any) {
    const nzTitle = data ? `编辑【${data.title}】` : '新增';
    const modal: NzModalRef = this.modal.create<CameraEditComponent>({
      nzTitle,
      nzContent: CameraEditComponent,
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
    localStorage.setItem('grid_type', JSON.stringify(gridType));
    this.setNzSpan();
    this.handlePageIndexChange(1);
  }
}
