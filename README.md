# sloth (code generater)

![](./logo.png)

### 简介

无第三方依赖，纯 js 实现的一个轻量级的模板引擎。

### 示例

数据源:

| name         | property | comment |
| ------------ | -------- | ------- |
| id           | string   | ID      |
| chinese_name | string   | 中文名  |
| english_name | string   | 英文名  |
| age          | number   | 年龄    |
| phone        | string   | 手机    |

tableName： user

模板:

```js
<#-- 测试用模板 -->

class #b{tableName} {
<#list table>
  #l{table.name}:#{table.property}; //#{table.comment}

</#list>
}
```

输出:

```js
class User {
  id: string; //ID

  chineseName: string; //中文名

  englishName: string; //英文名

  age: number; //年龄

  phone: string; //手机
}
```

### 如何使用

### 模板语法

命名法则:

```
#{} 默认小驼峰式 little camel-case

#u{} 大写写下滑线 upper case downline

#l{} 小写下滑线 lower case downline

#b{} 大驼峰式 big camel-case
```

列表:

```
<#list [listName]>
  #{listName.aaa} #{listName.bbb}
</#list>
```

注释:

```
<#-- 这段不会输出 -->
```

### 依赖

nodemon 修改模板引擎的时候热更新代码重新部署

watch 修改模板的时候，实时输出代码
