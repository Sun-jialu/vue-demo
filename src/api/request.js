import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import { Notification } from 'element-ui'
// const SITE = require('SITE')
// 创建axios实例
const service = axios.create({
  // baseUrl:SITE['baseUrl'],
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['token'] = Vue.cookie.get('token')
  // console.log(config)
  return config
}, error => {
  console.log(1)
  return Promise.reject(error)
})
// response拦截器
service.interceptors.response.use(response => {
  let { data } = response || { data: {} };
  // if (data && data.code === '') { // token失效code
  //   Vue.cookie.delete('token')
  //   router.push({ name: 'login' })
  // }
  if (data && data.rsCode != "AAAAAAA") {
    Notification.error({
      title: "失败",
      message: data.rsMsg || '接口错误',
    });
  }
  return data

}, error => {
  Notification.error({
    title: "失败",
    message: '接口服务错误',
  });
  return Promise.reject(error)
})

export default service
