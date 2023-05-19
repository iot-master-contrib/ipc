import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./base/page-not-found/page-not-found.component";
import { CameraComponent } from './camera/camera.component';
import { BridgeComponent } from './bridge/bridge.component';
const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'camera' },
    { path: 'camera', component: CameraComponent },
    { path: 'bridge', component: BridgeComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
