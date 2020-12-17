"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 8080,
    open: false, // 项目启动后自动打开浏览器
    https: false, // 模拟https访问
    // host: "localhost", // 主机名，也可以127.0.0.1 或做真机测试时 x.x.x.x
    proxy: {
      "dev-apis": {
        target: "http://localhost:9528", // 可以将 /dev-apis/data.json 替换成http://localhost:9528/data.json
        ws: true, // proxy websockets
        changeOrigin: false, //开启代理服务，就去进行请求转发
        pathRewrite: {
          //重写地址，否则就是localhost:9528/dev-apis/data.json了 这里需要把这个dev-apis抹掉
          "^/dev-apis": ""
        }
      },
      "/admin": {
        target: "http://ceshi5.dishait.cn/admin",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/admin": ""
        }
      }
    }
  },
  assetsDir: "static", // 定义打包后静态资源存放的文件夹,否则会散乱开(比如：dist/static/css 、dist/static/js等)
  productionSourceMap: false, // 打包时，不生成.map文件，加快打包构建
  configureWebpack: {
    resolve: {
      // 配置文件夹快捷解析名
      alias: {
        "@": resolve("src")
      }
    }
  }
};
