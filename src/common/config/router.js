/**
 * 规则：
 *
 * _________________先判断递归对象里是否有path和name属性，如果没有的话。
 * 一、例如：index/index、shop/index以index结尾的，path和name默认去除index
 *      例如：index/index的name:index、path:/index
 *            shop/index的name:shop、path:/shop
 *
 * 二、例如：shop/list，默认生成name为shop_list(如果结尾为index，例如shop/index则是shop)
 *      例如：order/order/index的name:order_order、path:/order/order
 *
 * 如果有path和name属性的话，如果已经配置path和name的话，则不会自动生成
 */

// 配置所有的路由的配置文件

let routes = [
  {
    // path: "/login",
    // name: "login",
    // component: () => import("@/views/login/index.vue")
    meta: { title: "登录页" },
    component: "login/index"
  }
];

// 获取路由信息方法
let getRoutes = function() {
  // 自动生成路由(第一层)
  createRoute(routes);
  return routes;
};

// 根据组件名 自动懒加载导入生成路由组件（利用递归）
function createRoute(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 如果传进来的路由数组没有component的话，直接跳出本方法
    if (!arr[i].component) {
      return;
    }
    // 去除index
    let val = removeIndexStr(arr[i].component);
    // 自动生成name(需要将/转换成_) 注意：如果已存在name或path则不会重新生成覆盖
    arr[i].name = arr[i].name || val.replace(/\//g, "_");
    // 自动生成path
    arr[i].path = arr[i].path || `/${val}`;
    // 自动生成component
    let componentFun = import(
      /* webpackChunkName: "[request]" */ `@/views/${arr[i].component}.vue`
    );
    arr[i].component = () => componentFun;
    // 判断是否还有子路由，有的话继续递归
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children);
    }
  }
}

// 去除index
function removeIndexStr(str) {
  // 获取最后一个/的索引
  let index = str.lastIndexOf("/");
  // 获取最后一个/后面的值
  let val = str.substring(index + 1, str.length);
  // 判断结尾是不是index
  if (val === "index") {
    return str.substring(0, index);
  }
  return str;
}

export default getRoutes();
