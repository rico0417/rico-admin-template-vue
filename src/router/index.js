import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/common/config/router.js";

console.log(routes);
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

//cv以下代码解决路由地址重复的报错问题(一劳永逸)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
