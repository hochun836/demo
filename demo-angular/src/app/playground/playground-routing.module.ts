import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Func0010Component } from '../func/func0010/func0010.component';
import { Func0020Component } from '../func/func0020/func0020.component';
import { Func0030Component } from '../func/func0030/func0030.component';
import { Func0040Component } from '../func/func0040/func0040.component';
import { Func0050Component } from '../func/func0050/func0050.component';
import { Func0060Component } from '../func/func0060/func0060.component';
import { Func0070Component } from '../func/func0070/func0070.component';
import { Func0080Component } from '../func/func0080/func0080.component';
import { Func0090Component } from '../func/func0090/func0090.component';
import { Func0100Component } from '../func/func0100/func0100.component';
import { PlaygroundComponent } from './playground.component';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  {
    path: '', component: PlaygroundComponent, children: [

      { path: '', component: WelcomeComponent, },
      { path: 'func0010', component: Func0010Component, },
      { path: 'func0020', component: Func0020Component, },
      { path: 'func0030', component: Func0030Component, },
      { path: 'func0040', component: Func0040Component, },
      { path: 'func0050', component: Func0050Component, },
      { path: 'func0060', component: Func0060Component, },
      { path: 'func0070', component: Func0070Component, },
      { path: 'func0080', component: Func0080Component, },
      { path: 'func0090', component: Func0090Component, },
      { path: 'func0100', component: Func0100Component, },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule { }
