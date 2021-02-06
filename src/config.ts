import path from 'path';

const config:any = {
  // 输出目录不能放在项目内，不然热更新会死循环
  output: path.join(__dirname, `../../output/`),
  // 模板目录存放路径
  template: path.join(__dirname, `../template/`),
  // xlsx文件存放路径
  xlsxFile: path.join(__dirname, `../DataCenter.xlsx`),
  // 是否自动清理文件
  autoClean: true,
  //autoClean: false,
  // 过滤输出目录, 绝对路径下含有以下字段则保留。
  ignoreDir: ['node_modules'],
  // 过滤系统无用文件
  ignoreFiles: ['.DS_Store'],
};

export default config;
