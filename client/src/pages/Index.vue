<template>
  <q-page class="flex">     
    
  <div class="q-pa-md" style="width: 100%">    
    <div v-if="!Object.keys(getTasks).length" class="negative">No tasks!</div>
    <q-list v-else bordered padding>      
      <q-item-label header>Tasks List</q-item-label>

      <Task v-for="(task, key) in getTasks"
        :key="key"
        :task="task"
        :id="key"    
        />

    </q-list>
  </div>
    
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab 
             icon="add" 
             color="primary"
             @click="showAddTask = true"
              />
    </q-page-sticky>

    <q-dialog v-model="showAddTask" persistent>
      <AddTask
        @savetask="save"    
        @keydown.enter="save"   
        @close="showAddTask = false" 
        />
    </q-dialog> 

  </q-page>
</template>

<script>

import { axiosInstance } from 'boot/axios'
import Task from '../components/tasks/Task'
import AddTask from '../components/tasks/modals/AddTask'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  components: {
    Task, AddTask
  },
  data(){
    return {
      tasks: [],
      showAddTask: false
    }
  },  
  created(){
    this.$q.loading.show()
    this.loadData()
    .then(this.$q.loading.hide())    
  },
  computed: {    
    ...mapGetters('tasks', ['getTasks']),
  },
  methods: {
    ...mapActions('tasks', ['loadData', 'createTask']),    
    save(data){
      this.$q.loading.show()
      this.createTask(data)      
      .then(this.$q.loading.hide())
      .then(this.successNotify())
      .catch(err => this.errorNotify())
    },
    errorNotify(){
      this.$q.notify({
        message: 'Error',
        color: 'negative'
      })
    },
    successNotify(){
      this.$q.notify({
          message: 'Successfull',
          color: 'green'
      })
    }
  }
}
</script>
