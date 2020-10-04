import Vue from 'vue'
import { axiosInstance } from 'boot/axios'

const state = {
  tasks: []  
}

const mutations = {
  CREATE_TASK(state, payload){
    state.tasks.push(payload)
  },
  UPDATE_TASKS(state, tasks){
    state.tasks = tasks
  },
  DELETE_TASK(state, id){
    Vue.delete(state.tasks, id)
  }
}

const actions = {
  loadData({commit}){
    axiosInstance
    .get('/api/task-list/')
    .then((resp) => {      
      commit('UPDATE_TASKS', resp.data)
    })
  },
  createTask({commit, dispatch}, payload){
    axiosInstance
    .post('/api/task-create/', payload)
    .then((resp) => {      
      commit('CREATE_TASK', payload)
      dispatch('loadData')
    })
    .catch(err => console.log(err))
  },
  updateTask({commit}, payload){
    commit('UPDATE_TASK', payload)
  },
  deleteTask({commit, dispatch}, id){
    axiosInstance
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