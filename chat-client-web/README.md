## 项目结构

```
├─ /node_modules
├─ package.json
├─ /public
|  ├─ favicon.ico        <-- 网页图标
|  └─ index.html         <-- HTML页模板
├─ README.md
├─ /src
|  ├─ /common            <-- 全局公用目录
|  |  ├─ /fonts          <-- 字体文件目录
|  |  ├─ /images         <-- 图片文件目录
|  |  ├─ /js             <-- 公用js文件目录
|  |  └─ /style          <-- 公用样式文件目录
|  |  |  ├─ frame.css    <-- 全部公用样式（import其他css）
|  |  |  ├─ reset.css    <-- 清零样式
|  |  |  └─ global.css   <-- 全局公用样式
|  ├─ /components        <-- 公共模块组件目录
|  |  ├─ /header         <-- 头部导航模块
|  |  |  ├─ tchatWebSocket.js     <-- header主文件
|  |  |  └─ header.css   <-- header样式文件
|  |  └─ ...             <-- 其他模块
|  ├─ /containers        <-- 页面组件目录
|  |  ├─ /home           <-- home页目录
|  |  |  ├─ tchatWebSocket.js     <-- home主文件
|  |  |  └─ home.css     <-- home样式文件
|  |  ├─ /login          <-- login页目录
|  |  |  ├─ tchatWebSocket.js     <-- login主文件
|  |  |  └─ login.css    <-- login样式文件
|  |  └─ ...             <-- 其他页面
|  ├─ App.js             <-- 项目主模块
|  └─ tchatWebSocket.js           <-- 项目入口文件
└─ yarn.lock
```

## 项目规范

- 全局公用级别（不需要模块化）的 className，用 G-xxx。例如 G-autocut(截字)、G-color-red(文字红色)。
- 页面级别的 className，用 P-xxx。
- 模块级别的 className，用 M-xxx。

