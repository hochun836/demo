import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [SharedModule, HeaderComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
