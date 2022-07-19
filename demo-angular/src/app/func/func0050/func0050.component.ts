import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';

declare let FB: any;
@Component({
  selector: 'app-func0050',
  templateUrl: './func0050.component.html',
  styleUrls: ['./func0050.component.scss']
})
export class Func0050Component implements OnInit {

  fbInfo: string;

  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  facebookLogin(): void {
    this.zone.runOutsideAngular(() => {
      FB.getLoginStatus(this.fbStatusCb.bind(this));
    });
  }

  googleLogin(): void {
  }

  private fbStatusCb = (response) => {
    console.log(response);
    if (response.status === 'connected') {
      FB.api('/me', this.fbInfoCallback.bind(this));
      return;
    }
    FB.login(this.fbLoginCb.bind(this));
  }

  private fbLoginCb = (response) => {
    console.log(response);
    FB.api('/me', this.fbInfoCallback.bind(this));
  }

  private fbInfoCallback = (response) => {
    console.log(response);
    this.fbInfo = `[Facebook] name: ${response.name}`;
    alert(this.fbInfo);
    this.cd.detectChanges();
  }
}
