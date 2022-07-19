import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './common/storage.service';

declare let gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public zone: NgZone,
    private renderer: Renderer2,
    private router: Router,
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
      this.router.events
        .pipe(
          distinctUntilChanged((previous: any, current: any) => {
            if (current instanceof NavigationEnd) {
              return previous.url === current.url;
            }
            return true;
          }))
        .subscribe((x: any) => {
          gtag('event', 'page_view', { page_path: x.url });
        });
    }
  }
}
