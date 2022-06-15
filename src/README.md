# 灵感宝盒的静态页面代码与数据更新

## 1）源数据更新
> 一共有两个版本数据，`../data/main.md`、`../data/s.xlsx`，数据内容一样，正在使用的xlsx版本的。
需要手动在 `../data/s.xlsx`中添加需要更新的数据。

## 2）执行如下脚本
`npm start` 会读取`../data/s.xlsx`的数据，解析为下面JSON格式数据。
``` json
{
    "value": 24,
    "name": "WebFilterDNS.framework",
    "path": "PrivateFrameworks/WebFilterDNS.framework",
    "children": [
        {
            "value": 16,
            "name": "Versions",
            "path": "PrivateFrameworks/WebFilterDNS.framework/Versions"
        }
    ]
},
```
上面 JSON 格式的数据会写入`../data/r.json`中。

## 3）本地预览变化
通过浏览器打开`../index.html`就可以看到。