const path = require('path')
const http = require('http')
const fs = require('fs')
const server = http.createServer()
let url = require('url')
let querystring = require("querystring")

server.on('request', (req, res) => {
  let route = req.url
  let arg = url.parse(req.url).query
  let params = querystring.parse(arg)
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (route.startsWith('/index')) {
    index(res)
    return
  }
  if (route.startsWith('/add')) {
    add(res, params)
    return
  }
  res.end('404 找不到页面')
})


function index(res) {
  fs.readFile('./test.json', 'utf-8', function (err, data) {
    if (err) {
      throw err;
    }
    res.end(data)
  })
}

function add(res, params) {
  let {
    name,
    desc
  } = params
  fs.readFile('./test.json', 'utf-8', function (err, data) {
    if (err) {
      throw err;
    }
    let list = JSON.parse(data)
    let id = list[list.length - 1].id + 1
    list.push({
      id,
      name,
      desc
    })
    fs.writeFile('./test.json', JSON.stringify(list), 'utf-8', (err) => {
      if (err) {
        throw err;
      }
      res.end('ok')
    })

  })
}

function del(res, params) {
  fs.readFile('./test.json', 'utf-8', function (err, data) {
    if (err) {
      throw err;
    }

  })
}
server.listen(8088, _ => {
  console.log("服务器已经打开")
})