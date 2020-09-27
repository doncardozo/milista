import Vue from 'vue'
import axios from 'axios'

var url = process.env.API
const axiosInstance = axios.create({
  baseURL: url
})

// console.log(url)

Vue.prototype.$axios = axiosInstance

// Vue.prototype.$axios = axios

export { axiosInstance }
