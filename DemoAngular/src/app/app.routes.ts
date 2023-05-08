import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'playground', loadChildren: () => import('./playground/playground.routes') },
  { path: '', component: IndexComponent },
  { path: '**', component: PageNotFoundComponent, data: { reuse: true } },
];
