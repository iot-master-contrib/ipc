import { Component } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

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
  checkedKeys = [];
  showCheckedKeys = [];
  nzSpan = 12;
  pageIndex = 1;

  constructor() {
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
    this.showCheckedKeys = this.checkedKeys.slice(0, 4);
  }
  handleChecked(data: NzFormatEmitEvent): void {
    console.log(data);
  }
}
