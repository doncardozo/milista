import Vue from 'vue'
import { axiosInstance } from 'boot/axios'

const state = {
  tasks: []  
}

const mutations = {
  LOAD_TASKS(state, tasks){           
    state.tasks = tasks
  },
  CREATE_TASK(state, payload){
    state.tasks.push(payload)
  },
  UPDATE_TASK(state, payload){        
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  DELETE_TASK(state, id){
    Vue.delete(state.tasks, id)
  }
}

const actions = {
  async loadData({commit}){
    await axiosInstance
    .get('/api/task-list/')
    .then((resp) => {      
      commit('LOAD_TASKS', resp.data)
    })
  },
  async createTask({commit, dispatch}, payload){
    await axiosInstance
    .post('/api/task-create/', payload)
    .then((resp) => {      
      commit('CREATE_TASK', payload)
      // dispatch('loadData')
    })
    .catch(err => console.log(err))
  },
  async updateTask({commit, dispatch}, payload){     
    await axiosInstance
    .put(`/api/task-update/${payload.updates.id}/`, payload.updates)
    .then((resp) => {      
      commit('UPDATE_TASK', payload)
      // dispatch('loadData')
    })
    .catch(err => console.log(err))
  },
  async deleteTask({commit, dispatch}, id){
    await axiosInstance
    .delete(`/api/task-delete/${id}/`)
    .then((resp) => {   
      commit('DELETE_TASK', id)
      dispatch("loadData")
    })
    .catch(err => console.log(err))    
  }
}

const getters = {
  getTasks(state){
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}