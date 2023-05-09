import { AOA, DbType, StringBuilder } from 'src/app/common/scheme';
import { isNotEmpty, removeByIndex } from 'src/app/common/util';

enum Column {
  TableId,
  TableName,
}

enum OracleColumn {
  TableId,
  TableName,
  PrimaryKey,
  ColumnId,
  ColumnName,
  DataType,
  Nullable,
  DefaultValue,
  Unique,
  Comment,
  ReferenceTableId,
  ReferenceColumnId,
}

enum MssqlColumn {
  TableId,
  TableName,
  PrimaryKey,
  ColumnId,
  ColumnName,
  DataType,
  Nullable,
  DefaultValue,
  AutoIncrement,
  Unique,
  Comment,
  ReferenceTableId,
  ReferenceColumnId,
}

enum MysqlColumn {
  TableId,
  TableName,
  PrimaryKey,
  ColumnId,
  ColumnName,
  DataType,
  Nullable,
  DefaultValue,
  AutoIncrement,
  Unique,
  Comment,
  ReferenceTableId,
  ReferenceColumnId,
  OnDelete,
  OnUpdate,
}

const SPACE = ' ';
const CHANGE_LINE = '\n';

export function createSql(rowList: AOA, dbType: DbType, model: any): string {

  const sb = new StringBuilder();

  const sql = createAheadSql(dbType, model);
  sb.append(sql + CHANGE_LINE);

  const startRow = 0;
  const endRow = rowList.length - 1;

  let currTableStartRow = startRow;
  let currTableEndRow = startRow;
  let tempTableStartRow = startRow;
  let currTableId: string;
  let nextTableId: string;

  rowList.forEach((row, i) => {

    currTableId = row[Column.TableId];
    nextTableId = i === endRow ? '' : rowList[i + 1][Column.TableId];

    if (currTableId !== nextTableId) {
      currTableStartRow = tempTableStartRow;
      currTableEndRow = i;
      tempTableStartRow = i + 1;
      const subRowList = rowList.slice(currTableStartRow, currTableEndRow + 1);
      const sql = createOneTableSql(dbType, model, subRowList);
      sb.append(sql + CHANGE_LINE);
    }
  });

  return sb.toString();
}

function createAheadSql(dbType: DbType, model: any) {
  switch (dbType) {
    case DbType.Oracle:
      return "";
    case DbType.Mssql:
      return createAheadSql4Mssql(model);
    case DbType.Mysql:
      return "";
  }
}

function createAheadSql4Mssql(model: any): string {

  const sb = new StringBuilder();

  sb.append(`USE [${model.db}]` + CHANGE_LINE);
  sb.append('GO' + CHANGE_LINE);

  return sb.toString();
}

function createOneTableSql(dbType: DbType, model: any, rowList: AOA): string {
  switch (dbType) {
    case DbType.Oracle:
      return createOneTab4Oracle(model, rowList);
    case DbType.Mssql:
      return createOneTab4Mssql(model, rowList);
    case DbType.Mysql:
      return createOneTab4Mysql(model, rowList);
  }
}

function createOneTab4Oracle(model: any, rowList: AOA): string {

  const sb = new StringBuilder();

  const startRow = 0;
  const endRow = rowList.length - 1;
  const tableId = rowList[startRow][OracleColumn.TableId];
  const tableName = rowList[startRow][OracleColumn.TableName];

  const username = model.username;

  sb.append(`--------------------------------------------------------------` + CHANGE_LINE);
  sb.append(`-------------- DDL for ${tableId} (${tableName})` + CHANGE_LINE);
  sb.append(`--------------------------------------------------------------` + CHANGE_LINE);

  // Table
  sb.append(`DROP TABLE "${username}"."${tableId}";` + CHANGE_LINE);

  sb.append(`CREATE TABLE "${username}"."${tableId}"` + CHANGE_LINE);
  sb.append('(' + CHANGE_LINE);

  // Column
  rowList.forEach((row, i) => {

    const columnId = row[OracleColumn.ColumnId];
    const dataType = row[OracleColumn.DataType];
    const nullable = row[OracleColumn.Nullable];
    const defaultValue = row[OracleColumn.DefaultValue];
    const unique = row[OracleColumn.Unique];

    const sql = new StringBuilder();

    sql.append(`"${columnId}" ${dataType}`);

    if (nullable === 'Y') {
      sql.append('NULL');
    } else {
      sql.append('NOT NULL');
    }

    if (isNotEmpty(defaultValue)) {
      sql.append(`DEFAULT ${defaultValue}`);
    }

    if (unique === 'Y') {
      sql.append('UNIQUE');
    }

    if (i !== rowList.length - 1) {
      sql.append(',');
    }

    sb.append(sql.toString(SPACE) + CHANGE_LINE);
  });

  sb.append(');' + CHANGE_LINE);

  // Primary Key
  const pkColumnIds = rowList
    .filter(row => isNotEmpty(row[OracleColumn.PrimaryKey]))
    .map(row => `"${row[OracleColumn.ColumnId]}"`)
    .join(',');

  if (isNotEmpty(pkColumnIds)) {
    sb.append(`ALTER TABLE "${username}"."${tableId}" ADD CONSTRAINT "IX_${tableId}" PRIMARY KEY (${pkColumnIds});` + CHANGE_LINE);
  }

  // Foreign Key
  rowList
    .filter(row => isNotEmpty(row[OracleColumn.ReferenceTableId]))
    .map(row => `ALTER TABLE "${username}"."${tableId}" ADD CONSTRAINT "FK_${tableId}" FOREIGN KEY("${row[OracleColumn.ColumnId]}") REFERENCES "${username}"."${row[OracleColumn.ReferenceTableId]}" ("${row[OracleColumn.ReferenceColumnId]}");` + CHANGE_LINE)
    .forEach(sql => sb.append(sql));

  // Comment Table
  sb.append(`COMMENT ON TABLE "${username}"."${tableId}" IS '${tableName}';` + CHANGE_LINE);

  // Comment Column
  rowList
    .forEach(row => {
      const desc = isNotEmpty(row[OracleColumn.Comment]) ? `${row[OracleColumn.ColumnName]}[${row[OracleColumn.Comment]}]` : row[OracleColumn.ColumnName];
      sb.append(`COMMENT ON COLUMN "${username}"."${tableId}"."${row[OracleColumn.ColumnId]}" IS '${desc.substring(0, 30)}';` + CHANGE_LINE);
    });

  return sb.toString();
}

function createOneTab4Mssql(model: any, rowList: AOA): string {

  const sb = new StringBuilder();

  const startRow = 0;
  const endRow = rowList.length - 1;
  const tableId = rowList[startRow][MssqlColumn.TableId];
  const tableName = rowList[startRow][MssqlColumn.TableName];

  const schema = model.schema;

  sb.append(`--------------------------------------------------------------` + CHANGE_LINE);
  sb.append(`-------------- DDL for ${tableId} (${tableName})` + CHANGE_LINE);
  sb.append(`--------------------------------------------------------------` + CHANGE_LINE);

  // Table
  sb.append('SET ANSI_NULLS ON' + CHANGE_LINE);
  sb.append('GO' + CHANGE_LINE);

  sb.append('SET QUOTED_IDENTIFIER ON' + CHANGE_LINE);
  sb.append('GO' + CHANGE_LINE);

  sb.append('SET ANSI_PADDING OFF' + CHANGE_LINE);
  sb.append('GO' + CHANGE_LINE);

  sb.append(`DROP TABLE [${schema}].[${tableId}]` + CHANGE_LINE);
  sb.append('GO' + CHANGE_LINE);

  sb.append(`CREATE TABLE [${schema}].[${tableId}]` + CHANGE_LINE);
  sb.append('(' + CHANGE_LINE);

  // Column
  rowList.forEach((row, i) => {

    const columnId = row[MssqlColumn.ColumnId];
    const dataType = row[MssqlColumn.DataType];
    const nullable = row[MssqlColumn.Nullable];
    const defaultValue = row[MssqlColumn.DefaultValue];
    const autoIncrement = row[MssqlColumn.AutoIncrement];
    const unique = row[MssqlColumn.Unique];

    const sql = new StringBuilder();

    sql.append(`[${columnId}] ${dataType}`);

    if (nullable === 'Y') {
      sql.append('NULL');
    } else {
      sql.append('NOT NULL');
    }

    if (isNotEmpty(defaultValue)) {
      sql.append(`DEFAULT ${defaultValue}`);
    }

    if (autoIncrement === 'Y') {
      sql.append('IDENTITY(1,1)');
    }

    if (unique === 'Y') {
      sql.append('UNIQUE');
    }

    if (i !== rowList.length - 1) {
      sql.append(',');
    }

    sb.append(sql.toString(SPACE) + CHANGE_LINE);
  });

  // Primary Key
  const pkColumnIds = rowList
    .filter(row => isNotEmpty(row[MssqlColumn.PrimaryKey]))
    .map(row => row[MssqlColumn.ColumnId])
    .join(',');

  if (isNotEmpty(pkColumnIds)) {
    sb.append(`,CONSTRAINT [IX_${tableId}] PRIMARY KEY CLUSTERED (${pkColumnIds}) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]` + CHANGE_LINE);
  }

  sb.append(') ON [PRIMARY]' + CHANGE_LINE);
  sb.append('GO' + CHANGE_LINE);

  sb.append('SET ANSI_PADDING OFF' + CHANGE_LINE);
  sb.append('GO' + CHANGE_LINE);

  // Foreign Key
  rowList
    .filter(row => isNotEmpty(row[MssqlColumn.ReferenceTableId]))
    .map(row => `ALTER TABLE [${schema}].[${tableId}] WITH CHECK ADD CONSTRAINT [FK_${tableId}_${row[MssqlColumn.ReferenceTableId]}] FOREIGN KEY(${row[MssqlColumn.ColumnId]}) REFERENCES [${schema}].[${row[MssqlColumn.ReferenceTableId]}] (${row[MssqlColumn.ReferenceColumnId]})` + CHANGE_LINE)
    .forEach(sql => {
      sb.append(sql);
      sb.append('GO' + CHANGE_LINE);
    });

  // Comment Table
  sb.append(`EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'${tableName}', @level0type=N'SCHEMA', @level0name=N'${schema}', @level1type=N'TABLE', @level1name=N'${tableId}'` + CHANGE_LINE);
  sb.append('GO' + CHANGE_LINE);

  // Comment Column
  rowList
    .forEach(row => {
      const desc = isNotEmpty(row[MssqlColumn.Comment]) ? `${row[MssqlColumn.ColumnName]}[${row[MssqlColumn.Comment]}]` : row[MssqlColumn.ColumnName];
      sb.append(`EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'${desc}', @level0type=N'SCHEMA', @level0name=N'${schema}', @level1type=N'TABLE', @level1name=N'${tableId}', @level2type=N'COLUMN', @level2name=N'${row[MssqlColumn.ColumnId]}'` + CHANGE_LINE);
      sb.append('GO' + CHANGE_LINE);
    });

  return sb.toString();
}

function createOneTab4Mysql(model: any, rowList: AOA): string {

  const sb = new StringBuilder();

  const startRow = 0;
  const endRow = rowList.length - 1;
  const tableId = rowList[startRow][MysqlColumn.TableId];
  const tableName = rowList[startRow][MysqlColumn.TableName];

  sb.append(`-- ------------------------------------------------------------` + CHANGE_LINE);
  sb.append(`-- ------------ DDL for ${tableId} (${tableName})` + CHANGE_LINE);
  sb.append(`-- ------------------------------------------------------------` + CHANGE_LINE);

  // Table
  sb.append(`DROP TABLE IF EXISTS \`${tableId}\`;` + CHANGE_LINE);

  sb.append(`CREATE TABLE \`${tableId}\` (` + CHANGE_LINE);

  // Column
  rowList.forEach(row => {

    const columnId = row[MysqlColumn.ColumnId];
    const columnName = row[MysqlColumn.ColumnName];
    const dataType = row[MysqlColumn.DataType];
    const nullable = row[MysqlColumn.Nullable];
    const defaultValue = row[MysqlColumn.DefaultValue];
    const autoIncrement = row[MysqlColumn.AutoIncrement];
    const comment = row[MysqlColumn.Comment];

    const sql = new StringBuilder();

    sql.append(`\`${columnId}\` ${dataType}`);

    if (nullable === 'Y') {
      sql.append('NULL');
    } else {
      sql.append('NOT NULL');
    }

    if (isNotEmpty(defaultValue)) {
      sql.append(`DEFAULT ${defaultValue}`);
    }

    if (autoIncrement === 'Y') {
      sql.append('AUTO_INCREMENT');
    }

    if (isNotEmpty(comment)) {
      sql.append(`COMMENT '${columnName}[${comment}]'`);
    } else {
      sql.append(`COMMENT '${columnName}'`);
    }

    sql.append(',');

    sb.append(sql.toString(SPACE) + CHANGE_LINE);
  });

  // Primary Key
  const pkColumnIds = rowList
    .filter(row => isNotEmpty(row[MysqlColumn.PrimaryKey]))
    .map(row => `\`${row[MysqlColumn.ColumnId]}\``)
    .join(',');

  if (isNotEmpty(pkColumnIds)) {
    sb.append(`PRIMARY KEY (${pkColumnIds}) USING BTREE,` + CHANGE_LINE);
  }

  // Unique
  rowList
    .filter(row => isNotEmpty(row[MysqlColumn.Unique]))
    .map(row => `UNIQUE (\`${row[MysqlColumn.ColumnId]}\`),` + CHANGE_LINE)
    .forEach(sql => sb.append(sql));

  // Foreign Key
  rowList
    .filter(row => isNotEmpty(row[MysqlColumn.ReferenceTableId]))
    .map(row => `CONSTRAINT \`${row[MysqlColumn.TableId]}_${row[MysqlColumn.ColumnId]}\` FOREIGN KEY (\`${row[MysqlColumn.ColumnId]}\`) REFERENCES \`${row[MysqlColumn.ReferenceTableId]}\` (\`${row[MysqlColumn.ReferenceColumnId]}\`) ON DELETE ${row[MysqlColumn.OnDelete]} ON UPDATE ${row[MysqlColumn.OnUpdate]},` + CHANGE_LINE)
    .forEach(sql => sb.append(sql));

  sb.append(`) ENGINE = ${model.engine} CHARACTER SET = ${model.characterSet} COLLATE = ${model.collate} ROW_FORMAT = ${model.rowFormat};` + CHANGE_LINE);

  const result = sb.toString();
  return removeByIndex(result, result.lastIndexOf(','));
}
