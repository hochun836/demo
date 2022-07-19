import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomRouteReuseStrategy } from './common/custom-route-reuse-strategy';
import { HeaderComponent } from './index/header.component';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';

export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HammerModule,
    GoogleMapsModule,
    YouTubePlayerModule,
    SharedModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
