import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AOA, DbType } from 'src/app/common/scheme';
import { SharedModule } from 'src/app/shared/shared.module';
import * as XLSX from 'xlsx';
import { createSql } from './createSql';

@Component({
  selector: 'app-func0020',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './func0020.component.html',
  styleUrls: ['./func0020.component.scss']
})
export class Func0020Component implements OnInit {

  @ViewChild('form', { static: false }) form: NgForm;
  @ViewChild('file', { static: false }) fileRef: ElementRef<HTMLInputElement>;

  template: any;
  dbType: DbType;
  sql: string;
  model = {} as any;
  file: File;
  fileName: string;

  constructor() { }

  ngOnInit(): void {
  }

  handleFile(): void {
    const files = this.fileRef.nativeElement.files;
    if (files.length === 0) {
      this.file = undefined;
      this.fileName = '';
      return;
    }
    this.file = files[0];
    this.fileName = files[0].name;
  }

  excel2Sql(): void {
    if (this.form.invalid) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt: ProgressEvent<FileReader>) => {
      const workbook: XLSX.WorkBook = XLSX.read(evt.target.result, { type: 'binary' });
      const sheetName: string = workbook.SheetNames[0];
      const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const totalList: AOA = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // header: 1 is important!
      const rowList = totalList.slice(1);
      this.sql = createSql(rowList, this.dbType, this.model);
    };
    reader.readAsBinaryString(this.file);
  }
}
