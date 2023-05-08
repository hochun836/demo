import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NOOP } from '../common/constant';
import { SnavMode } from '../common/scheme';
import { funcList } from '../common/data';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [SharedModule, HeaderComponent],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent implements OnInit {

  @ViewChild('snav') snav: MatSidenav;

  snavMode: SnavMode;
  snavOpened: boolean;
  funcList = funcList;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {

    // init
    this.snavOpened = !this.breakpointObserver.isMatched('(max-width: 991px)');

    // observe
    this.breakpointObserver.observe(['(max-width: 991px)']).subscribe(state => {
      this.snavMode = !state.matches ? 'side' : 'over';
    }, NOOP, NOOP);

  }

  clickFunc(): void {
    if (this.snavMode === 'over') {
      this.snav.close();
    }
  }
}
