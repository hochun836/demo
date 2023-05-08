import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { StorageService } from './common/storage.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="app">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    @import 'src/scss/shared';

    .app {
      @include fill-parent-size();
    }
  `]
})
export class AppComponent implements OnInit {

  constructor(
    public zone: NgZone,
    private renderer: Renderer2,
    private overlayContainer: OverlayContainer,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private storage: StorageService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    const url1 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/image/angular.svg');
    this.matIconRegistry.addSvgIconInNamespace('custom-svg', 'angular', url1);
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    let theme = this.storage.getItem('theme');
    theme = theme === 'dark-theme' ? 'dark-theme' : 'light-theme';
    this.renderer.addClass(this.document.body, theme);
    this.renderer.addClass(this.overlayContainer.getContainerElement(), theme);

    // for 非正式環境
    if (!environment.production) {
      this.zone.onUnstable.subscribe(() => console.log('##### 事件 - 發生'));
      this.zone.onStable.subscribe(() => console.log('##### 事件 - 結束'));
    }

    // for 正式環境
    if (environment.production) {
    }
  }
}