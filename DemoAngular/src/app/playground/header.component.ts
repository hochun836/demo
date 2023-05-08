import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { StorageService } from '../common/storage.service';
import { SharedModule } from '../shared/shared.module';
import { PlaygroundComponent } from './playground.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public parent: PlaygroundComponent,
    private renderer: Renderer2,
    private overlayContainer: OverlayContainer,
    private storage: StorageService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
  }

  changeTheme(): void {
    const isDarkTheme = this.document.body.classList.contains('dark-theme');
    isDarkTheme ? this.dark2Light() : this.light2Dark();
  }

  private dark2Light(): void {
    this.storage.setItem('theme', 'light-theme');
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.removeClass(this.overlayContainer.getContainerElement(), 'dark-theme');
    this.renderer.addClass(this.document.body, 'light-theme');
    this.renderer.addClass(this.overlayContainer.getContainerElement(), 'light-theme');
  }

  private light2Dark(): void {
    this.storage.setItem('theme', 'dark-theme');
    this.renderer.removeClass(this.document.body, 'light-theme');
    this.renderer.removeClass(this.overlayContainer.getContainerElement(), 'light-theme');
    this.renderer.addClass(this.document.body, 'dark-theme');
    this.renderer.addClass(this.overlayContainer.getContainerElement(), 'dark-theme');
  }
}
