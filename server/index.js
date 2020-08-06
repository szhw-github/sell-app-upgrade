'use strict'

process.env.VUE_ENV = 'server'

const express = require('express')
const server = express()
const path = require('path')
const fs = require('fs')
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

// 在服务器处理函数中……
// server.use(proxy('/api/data.json', { target: 'http://127.0.0.1:8080/api/data.json', changeOrigin: true }))
server.use(express.static(path.resolve(__dirname, './dist')))
server.get('*', (req, res) => {
  console.log(req.url)
  if (/data.json$/i.test(req.url)) {
    console.log(req.url)
    let file = fs.readFileSync(path.resolve(__dirname, '../static/mock/data.json'), {
      encoding: 'utf-8'
    })
    res.write(file)
    res.end()
  } else if (req.url !== 'favicon.ico') {
    const context = {
      url: req.url
    }
    const ssrStream = renderer.renderToStream(context)
    let buffers = []
    ssrStream.on('error', (err) => {
      console.log(err)
    })
    ssrStream.on('data', (data) => {
      buffers.push(data)
    })
    ssrStream.on('end', () => {
      res.end(Buffer.concat(buffers))
    })
  }
})
server.listen(8080)
