import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../request.service';
import {Title} from "@angular/platform-browser";

declare var WebRtcStreamer: any;

@Component({
    selector: 'app-single-camera',
    templateUrl: './single-camera.component.html',
    styleUrls: ['./single-camera.component.scss']
})
export class SingleCameraComponent implements OnInit {
    cameraDetail: any = {};
    webrtcConfig = {
        options: "rtptransport=tcp&timeout=60",
    }
    itemWebrtc: any;

    constructor(private rs: RequestService,
                private route: ActivatedRoute,
                private title: Title,
    ) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.has('id')) {
            const id = this.route.snapshot.paramMap.get('id');
            this.rs.get(`camera/${id}`).subscribe((res) => {
                this.cameraDetail = res.data || {};
                this.title.setTitle(this.cameraDetail.name || this.cameraDetail.id)
                this.connect();
            });
        }
    }

    connect() {
        const options = this.webrtcConfig.options;
        const interval = setInterval(() => {
            const id = this.cameraDetail.id;
            const detail = this.cameraDetail;
            const video = document.getElementById(`video${id}`);
            if (video) {
                clearInterval(interval);
                const itemWebrtc = new WebRtcStreamer(`video${detail.id}`, detail.webrtc_streamer)
                itemWebrtc.connect(detail.url, "", options);
                this.itemWebrtc = itemWebrtc;
            }
        }, 10);
        window.onbeforeunload = () => {
            this.itemWebrtc.disconnect();
            this.itemWebrtc = null;
        }
    }
}
