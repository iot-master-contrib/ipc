import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./base/page-not-found/page-not-found.component";
import { DashComponent } from './dash/dash.component';
import { BridgeComponent } from './bridge/bridge.component';
const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dash' },
    { path: 'camera', component: DashComponent },
    { path: 'bridge', component: BridgeComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
