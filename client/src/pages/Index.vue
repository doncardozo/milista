<template>
  <q-page class="flex">     
    
    <List
      @deletetask="del" 
      :tasks="getTasks" 
      />
    
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
        @close="showAddTask = false" 
        />
    </q-dialog> 

  </q-page>
</template>

<script>

import { axiosInstance } from 'boot/axios'
import List from '../components/tasks/List'
import AddTask from '../components/tasks/modals/AddTask'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

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
    this.loadData()            
  },
  computed: {    
    ...mapGetters('tasks', ['getTasks']),
  },
  methods: {
    ...mapActions('tasks', ['loadData', 'createTask', 'deleteTask']),    
    save(data){
      this.$q.loading.show()
      this.createTask(data)      
      .then(this.$q.loading.hide())
      .then(this.successNotify())
      .catch(err => this.errorNotify())
    },
    del(id){      
      this.$q.loading.show()
      this.deleteTask(id)
      .then(this.$q.loading.hide())
      .then(this.successNotify())
      .catch(err => this.errorNotify())
    },
    update(){

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
