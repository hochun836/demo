import { Component, OnInit } from '@angular/core';
import { funcList } from '../data';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  funcList = funcList;

  constructor() { }

  ngOnInit(): void {
  }
}
