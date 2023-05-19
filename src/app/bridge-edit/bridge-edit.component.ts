import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-bridge-edit',
  templateUrl: './bridge-edit.component.html',
  styleUrls: ['./bridge-edit.component.scss']
})
export class BridgeEditComponent {
  @Input() id?: number | string;
  group!: FormGroup;
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private rs: RequestService,
    private msg: NzMessageService) {
  }

  ngOnInit(): void {
    if (this.id) {
      this.rs.get(`bridge/${this.id}`).subscribe(res => {
        this.setData(res);
      })
    }
    this.build()
  }
  setData(res: any) {
    const resData = res.data || {};
    const odata = this.validateForm.value;
    for (const key in odata) {
      if (resData[key]) {
        odata[key] = resData[key];
      }
      this.validateForm.setValue(odata);
    }
    // 给子组件设值
  }
  build(obj?: any) {
    obj = obj || {};
    this.validateForm = this.fb.group({
      id: [obj.id || '', this.id ? [Validators.required] : ''],
      bridge: [obj.bridge || '', [Validators.required]],
    });
  }

  submit() {
    return new Promise((resolve, reject) => {
      if (this.validateForm.valid) {
        let url = this.id ? `bridge/${this.id}` : `bridge/create`
        this.rs.post(url, this.validateForm.value).subscribe(res => {
          if (res.error) {
            this.msg.error(res.error);
          } else {
            this.msg.success("保存成功");
            resolve(true);
          }
        })
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
            reject();
          }
        });
      }

    })
  }
}
