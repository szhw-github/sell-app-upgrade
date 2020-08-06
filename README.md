# sell-app

> 点餐APP的项目改为自适应布局，并做了首屏加载的优化；
> <br>技术栈：vue2 vue-router vuex koa webpack Vue-SSR 
> <br>优化首屏加载的方法：
>  1. 合并资源请求：使用Photoshop制作精灵图，合并了图标的资源请求；
>  2. 设置图片懒加载；
>  3. 纯前端渲染改为服务端渲染：从零开始搭建服务端渲染；
<br>自适应布局的设计：
>  1. 自适应不同分辨率的移动设备：使用比例值rem作为尺寸单位，通过媒体查询设备的实际宽的范围，再计算出新的html元素的字体大小，并设置为参考字体大小，来实现等比缩放；

## 效果对比图
### 改造为SSR后的性能对比
<br>纯前端渲染的performance
<img src="https://github.com/szhw-github/sell-app-upgrade/raw/master/imgs/Vue-performance.png" width=200>
<br>新增SSR后的performance
<br>scripting的解析速率提高为原来的3倍
<img src="https://github.com/szhw-github/sell-app-upgrade/raw/master/imgs/VueSSR-performance.png" width=200>
### 自适应的对比图
<br>非自适应效果图-Galaxy.png
<img src="https://github.com/szhw-github/sell-app-upgrade/raw/master/imgs/非自适应效果图-Galaxy.png" width=200>
<br>自适应效果图-Galaxy
<img src="https://github.com/szhw-github/sell-app-upgrade/raw/master/imgs/自适应效果图-Galaxy.png" width=200>


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
