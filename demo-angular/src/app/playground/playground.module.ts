import { NgModule } from '@angular/core';
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
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header.component';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [
    PlaygroundComponent,
    HeaderComponent,
    WelcomeComponent,
    Func0010Component,
    Func0020Component,
    Func0030Component,
    Func0040Component,
    Func0050Component,
    Func0060Component,
    Func0070Component,
    Func0080Component,
    Func0090Component,
    Func0100Component,
  ],
  imports: [
    SharedModule,
    PlaygroundRoutingModule,
  ],
})
export class PlaygroundModule { }
