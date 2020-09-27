<template>
  <q-page class="flex">     
    
    <List :tasks="tasks" />
    
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab 
             icon="add" 
             color="accent"
             @click="showAddTask = true"
              />
    </q-page-sticky>

    <q-dialog v-model="showAddTask">
      <AddTask
        @savetask="save" 
        @close="showAddTask = false" 
        />
    </q-dialog>

  </q-page>
</template>

<script>

import { axiosInstance } from 'boot/axios'
import List from '../components/tasks/List'
import AddTask from '../components/tasks/modals/AddTask'

export default {
  name: 'PageIndex',
  components: {
    List, AddTask
  },
  data(){
    return {
      tasks: [],
      showAddTask: false
    }
  },  
  created(){
    this.getList()
  },
  methods: {
    save(o){
      axiosInstance
      .post('/api/task-create/', o)
      .then((resp) => {
        this.$q.notify({
          message: 'successfull',
          color: 'green'
        })
        this.getList()
      })
      .catch(err => {
        this.$q.notify({
          message: 'Error',
          color: 'negative'
        })
      })
    },
    getList(){
      axiosInstance.get('/api/task-list/')
      .then((resp) => {
        this.tasks = resp.data      
      })
      .catch((err) => console.error(err))
    }
  },
}
</script>
