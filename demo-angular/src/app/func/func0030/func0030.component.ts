import { Component, OnInit } from '@angular/core';
import { toNumber } from 'src/app/util/util';

@Component({
  selector: 'app-func0030',
  templateUrl: './func0030.component.html',
  styleUrls: ['./func0030.component.scss']
})
export class Func0030Component implements OnInit {

  template: any;
  calType: string;

  stock = {
    cost: { price: undefined, handlingFee: 0.1425, number: 1 },
    sell: { price: undefined, handlingFee: 0.1425, tax: 0.3, number: 1 },
  } as any;

  constructor() { }

  ngOnInit(): void {
  }

  calStockCost(): number {
    return toNumber(this.stock.cost.price) * 1000
      * (1 + toNumber(this.stock.cost.handlingFee) * 0.01)
      * toNumber(this.stock.cost.number);
  }

  calStockSell(): number {
    return toNumber(this.stock.sell.price) * 1000
      * (1 - toNumber(this.stock.sell.handlingFee) * 0.01 - toNumber(this.stock.sell.tax) * 0.01)
      * toNumber(this.stock.sell.number);
  }
}
