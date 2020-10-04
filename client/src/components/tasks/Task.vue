<template>
  <q-item tag="label" v-ripple>

    <q-item-section>
        <q-item-label>{{task.title}}</q-item-label>
    </q-item-section>
    <q-item-section side >
        <q-btn flat round color="negative" icon="delete" @click.stop="promptToDelete(task.id)" />
    </q-item-section>
    <q-item-section side >
        <q-btn flat round color="primary" @click.stop="showEditTask = true" icon="edit" />
    </q-item-section>
    <q-item-section side >
        <q-checkbox color="green" v-model="task.complete" disabled />
    </q-item-section>
    
    <q-dialog v-model="showEditTask" persistent>
      <EditTask            
        @close="showEditTask = false"
        :task="task"
        :id="id"   
        />
    </q-dialog>

  </q-item>


</template>

<script>
import EditTask from '../tasks/modals/EditTask'
import { mapActions } from 'vuex'

export default {
  props: ['task', 'id'],
  components: {
    EditTask
  },
  data(){
    return {
      showEditTask: false
    }
  },
  methods: {
    ...mapActions('tasks', ['deleteTask']),
    promptToDelete(id){
      this.$q.dialog({
        title: 'confirm',
        message: 'Really delete?',
        ok: {
            push: true
        },
        cancel: {
            color: 'negative'
        },
        persistent: true           
      }).onOk(() => {
        this.deleteTask(id)
      })
    }
  }
}
</script>

<style>

</style>