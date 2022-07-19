import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'playground', loadChildren: () => import('src/app/playground/playground.module').then(m => m.PlaygroundModule) },
  { path: '', component: IndexComponent },
  { path: '**', component: PageNotFoundComponent, data: { reuse: false } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
