import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./base/page-not-found/page-not-found.component";
import { CameraComponent } from './camera/camera.component';
import { BridgeComponent } from './bridge/bridge.component';
import { SingleCameraComponent } from './single-camera/single-camera.component';
const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'camera' },
    { path: 'camera', component: CameraComponent },
    { path: 'bridge', component: BridgeComponent },
    { path: 'mini/:id', component: SingleCameraComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
