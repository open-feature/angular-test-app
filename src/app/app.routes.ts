import { Routes } from '@angular/router';
import { ContextChangeComponent } from './demos/context-change/context-change.component';
import { FlagChangeComponent } from './demos/flag-change/flag-change.component';

export const routes: Routes = [
  { path: 'context-change', component: ContextChangeComponent },
  { path: 'flag-change', component: FlagChangeComponent },
];
