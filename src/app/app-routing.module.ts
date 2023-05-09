import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./base/page-not-found/page-not-found.component";
import { DashComponent } from './dash/dash.component';
const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dash' },
    { path: 'dash', component: DashComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
