const Koa = require('koa')
const favicon = require('koa-favicon')
const path = require('path')
const fs = require('fs')
const serve = require('koa-static')
const axios = require('axios')
const {
  createBundleRenderer
} = require('vue-server-renderer')
const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'))
const template = fs.readFileSync(path.relative(__dirname, '../dist/index.ssr.html'), 'utf-8')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
})
let app = new Koa()
app.use(serve('../dist'))
app.use(serve('../public'))
app.use(favicon('./public/favicon.ico', {
  maxage: 1000 * 60 * 15
}))
app.use(async (ctx, next) => {
  console.log(ctx.url)
  if (ctx.url === '/api/data.json') {
    let res = fs.readFileSync(path.resolve(__dirname, '../static/mock/data.json'), {
      encoding: 'utf-8'
    })
    ctx.body = res
    return
  }
  const context = {
    url: ctx.url
  }

  let html = await renderer.renderToString(context)
  ctx.body = html
  await next()
})

app.listen(9002, () => {
  console.log('a server start on port 9002')
})
