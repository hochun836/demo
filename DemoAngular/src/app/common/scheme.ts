export type SnavMode = 'over' | 'push' | 'side';

export enum DbType {
  Oracle = 'oracle',
  Mssql = 'mssql',
  Mysql = 'mysql',
}

// Array Of Array
export type AOA = Array<Array<any>>;

export enum ChartType {
  Chartjs = 'chartjs',
  Highcharts = 'highcharts',
}

export class StringBuilder {

  private list = [] as string[];

  append(str: string): void {
    this.list.push(str);
  }

  toString(): string {
    return this.list.join('');
  }
}