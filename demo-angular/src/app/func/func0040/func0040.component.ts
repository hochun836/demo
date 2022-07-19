import { Component, ElementRef, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
// import ChartAnnotation from 'chartjs-plugin-annotation';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as Highcharts from 'highcharts';
import { ChartType } from 'src/app/common/scheme';
import { chartjsConfig, highchartsOption } from 'src/app/data-chart';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');
const Export = require('highcharts/modules/exporting');
const Drilldown = require('highcharts/modules/drilldown');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
Export(Highcharts);
Drilldown(Highcharts);

@Component({
  selector: 'app-func0040',
  templateUrl: './func0040.component.html',
  styleUrls: ['./func0040.component.scss']
})
export class Func0040Component implements OnInit {

  @ViewChild('chartjsTemplate') chartjsTemplate: TemplateRef<HTMLDivElement>;
  @ViewChild('highchartsTemplate') highchartsTemplate: TemplateRef<HTMLDivElement>;

  @ViewChild('chartjsCanvas') chartjsCanvasRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('highchartsContainer') highchartsContainerRef: ElementRef<HTMLDivElement>;

  template: any;
  chartType: ChartType;

  constructor(
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
  }

  change(): void {
    switch (this.chartType) {
      case ChartType.Chartjs:
        return this.initChartjs();
      case ChartType.Highcharts:
        return this.initHighcharts();
    }
  }

  private initChartjs(): void {
    this.template = this.chartjsTemplate;
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        const obj = new Chart(this.chartjsCanvasRef.nativeElement, chartjsConfig);
      });
    });
  }

  private initHighcharts(): void {
    this.template = this.highchartsTemplate;
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        Highcharts.chart(this.highchartsContainerRef.nativeElement, highchartsOption);
      });
    });
  }
}
