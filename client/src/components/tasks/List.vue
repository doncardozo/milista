<template>
  <div class="q-pa-md" style="width: 100%">
    
    <div v-if="!tasks.length" class="negative">No tasks!</div>
    <q-list v-else bordered padding>      
      <q-item-label header>Tasks List</q-item-label>
      <q-item v-for="task in tasks" :key="task.id" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{task.title}}</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-btn flat round color="negative" @click="confirmDelete(task.id)" icon="delete" />
        </q-item-section>
        <q-item-section side >
          <q-btn flat round color="primary" @click="showEditTask = true" icon="edit" />
        </q-item-section>
        <q-item-section side >
          <q-checkbox color="green" v-model="task.complete" />
        </q-item-section>

        <q-dialog v-model="showEditTask">
          <EditTask            
            @close="showEditTask = false"        
            :task="task"
            />
        </q-dialog>

      </q-item>
    </q-list>

    <q-dialog v-model="showDeleteDialog" persistent class="coco">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="negative" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete this record?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Delete" id="btn-delete" @click="deletetask()" color="negative" v-close-popup />
          <q-btn flat label="Cancel" @click="showDeleteDialog = false" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
<script>

import EditTask from '../../components/tasks/modals/EditTask'

export default {
  props: ['tasks'],
  components: {
    EditTask
  },
  data(){
    return {
      showDeleteDialog: false,
      showEditTask: false
    }
  },
  methods: {
    deletetask(){ 
      let idItem = localStorage.getItem("id_item")     
      localStorage.removeItem("id_item")
      this.$emit('deletetask', idItem)
    },
    confirmDelete(id){
      this.showDeleteDialog = true
      localStorage.setItem('id_item', id)
    },
    // update(task){
    //   this.$emit('updatetask', task)
    // }
  },
}
</script>