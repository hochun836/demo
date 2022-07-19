import { format } from 'date-fns';

export const chartjsConfig: Chart.ChartConfiguration = {
  type: 'bar',
  data: {
    labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
    datasets: [{
      label: '捷運',
      backgroundColor: 'lightblue',
      data: [
        10, 5, 2, 7, 9, 1
      ],
    }, {
      label: '公車',
      backgroundColor: '#90EE90',
      data: [
        1, 2, 3, 4, 5, 6
      ],
    }, {
      label: '開車',
      backgroundColor: 'rgb(240, 128, 128)',
      data: [
        6, 1, 2, 8, 7, 5
      ],
    }],
  },
  options: {
    title: {
      display: true,
      text: '通勤人數',
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true,
      }],
    },
  },
};

const dt202101 = new Date('2021-01').getTime();
const dt202102 = new Date('2021-02').getTime();
const dt202103 = new Date('2021-03').getTime();
const dt202104 = new Date('2021-04').getTime();
const dt202105 = new Date('2021-05').getTime();

export const highchartsOption: any = {
  chart: {
    type: 'line',
    height: 500,
  },
  title: {
    text: '公司統計',
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    // tslint:disable-next-line:object-literal-shorthand typedef space-before-function-paren
    formatter: function () {
      return `x: ${format(this.x, 'yyyy/MM')} <br>y: ${this.y}`;
    },
  },
  xAxis: {
    type: 'datetime',
    labels: {
      // tslint:disable-next-line:object-literal-shorthand typedef space-before-function-paren
      formatter: function () {
        return format(this.value, 'yyyy/MM');
      },
    },
  },
  yAxis: {
    title: {
      text: '員工人數',
    },
  },
  series: [
    {
      name: '男性',
      turboThreshold: 500000,
      data: [
        [dt202101, 1],
        [dt202102, 2],
        [dt202103, 3],
        [dt202104, 4],
        [dt202105, 5],
      ],
    },
    {
      name: '女性',
      turboThreshold: 500000,
      data: [
        [dt202101, 3],
        [dt202102, 4],
        [dt202103, 5],
        [dt202104, 1],
        [dt202105, 2],
      ],
    },
  ],
};
