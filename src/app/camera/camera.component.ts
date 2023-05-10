import { Component, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {
  validateForm!: FormGroup;
  @ViewChild('id') id: any;
  constructor(
    private fb: UntypedFormBuilder,
  ) { }
  ngOnInit(): void {
    this.build();
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
