import { Route } from "@angular/router";
import { Func0010Component } from "../func/func0010/func0010.component";
import { Func0020Component } from "../func/func0020/func0020.component";
import { PlaygroundDefaultComponent } from "./playground-default.component";
import { PlaygroundComponent } from "./playground.component";

export default [
  {
    path: '',
    component: PlaygroundComponent,
    children: [
      { path: '', component: PlaygroundDefaultComponent, },
      { path: 'func0010', component: Func0010Component, },
      { path: 'func0020', component: Func0020Component, },
    ]
  },
] as Route[];