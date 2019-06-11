/**
 * api接口的统一出口
 * 这样就可以把api接口根据功能划分为多个模块，
 * 利于多人协作开发，
 * 比如一个人只负责一个模块的开发等，
 * 还能方便每个模块中接口的命名
 */

import admin from '../api/adminApi';


// 导出接口
export default {
  admin,

}
