// https://webpack.js.org/guides/dependency-management/#requirecontext

//     const modulesFiles = require.context(pathName, true, /\.js$/)
//     const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//set ./app.js    => app
//         const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//         const value = modulesFiles(modulePath)
//         modules[moduleName] = value //组件为.default
//         return modules
//     }, {})
import * as apitest from "./modules/apitest";
import * as login from "./modules/login";
import * as sys from "./modules/sys";
import * as sysuser from "./modules/sysuser";
import * as user from "./modules/user";

const API = {
    apitest,
    login,
    sys,
    sysuser,
    user,
}
export default API 