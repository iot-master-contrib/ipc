import { Component, Input } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {
  validateForm!: FormGroup;
  @Input() id?: number | string;
  constructor(
    private fb: UntypedFormBuilder,
    private rs: RequestService,
  ) { }
  ngOnInit(): void {
    this.build();
    if (this.id) {
      this.rs.get(`camera/${this.id}`).subscribe((res) => {
        this.setData(res);
      });
    }
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
  build(mess?: any) {
    mess = mess || {};
    this.validateForm = this.fb.group({
      id: [mess.id || '', this.id ? [Validators.required] : ''],
      name: [mess.name || ''],
      desc: [mess.desc || ''],
      url: [mess.url || ''],
      username: [mess.username || ''],
      password: [mess.password || '']
    });
  }
}
