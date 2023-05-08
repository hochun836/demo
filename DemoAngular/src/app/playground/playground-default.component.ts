import { Component, OnInit } from '@angular/core';
import { funcList } from '../common/data';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-playground-default',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './playground-default.component.html',
  styleUrls: ['./playground-default.component.scss']
})
export class PlaygroundDefaultComponent implements OnInit {

  funcList = funcList;

  constructor() { }

  ngOnInit(): void {
  }
}
