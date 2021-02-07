import path from 'path';

const config:any = {
  /* == [输入] 数据源 =========================================================== */
  // xlsx文件存放路径
  xlsxFile: path.join(__dirname, `../template/DataCenter.xlsx`),
  // 数据源
  dataSource: `table`,
  // 数据源名称
  dataSourceName: `tableName`,
  
  /* ============== 输入 模板 ============================= */
  // 模板目录存放路径
  template: path.join(__dirname, `../template/`),
  
  // 模板结尾的后缀
  general: {
    suffix: `.temp`,
  },
  column: {
    suffix: `.col`,
  },
  
  /* ============== 输出 =====*/
  output: path.join(__dirname, `../output/`),
  // 是否自动清理文件
  autoClean: true,
  //autoClean: false,
  // 过滤输出目录, 绝对路径下含有以下字段则保留。
  ignoreDir: ['node_modules'],
  // 过滤系统无用文件
  ignoreFiles: ['.DS_Store'],

};

export default config;
