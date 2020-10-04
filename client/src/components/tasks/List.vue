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
          <q-btn flat round color="negative" @click="del(task.id)" icon="delete" />
        </q-item-section>
        <q-item-section side >
          <q-btn flat round color="primary" @click="openEditDialog(task)" icon="edit" />
        </q-item-section>
        <q-item-section side >
          <q-checkbox color="green" v-model="task.complete" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showEditTask" persistent>
      <EditTask            
        @close="showEditTask = false"        
        />
    </q-dialog>

    <q-dialog v-model="showDeleteDialog" persistent>
      <DeleteModal
        @close="showDeleteDialog = false"   
        @deletetask="del"            
      />
    </q-dialog>

  </div>
</template>
<script>

import EditTask from '../../components/tasks/modals/EditTask'
import DeleteModal from '../../components/tasks/modals/DeleteModal'

export default {
  props: ['tasks'],
  components: {
    EditTask, DeleteModal
  },
  data(){
    return {
      showDeleteDialog: false,
      showEditTask: false
    }
  },
  methods: {
    del(id){       
      this.$emit('deletetask', id)
    },
    openEditDialog(task){
      
    }
  },
}
</script>