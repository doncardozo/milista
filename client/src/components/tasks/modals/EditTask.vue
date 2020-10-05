<template>
  <q-card style="width: 80%">
    <q-card-section>
      <div class="text-h6">Edit Task</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form              
        class="q-gutter-md"        
        >
        
        <q-input          
          v-model="taskToSubmit.title"       
          label="Task Title"
          hint="Task title..."
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"      
          @keyup.enter="submitForm"
          autofocus
        />
      
        <!-- <q-toggle v-model="taskToSubmit.complete" label="Completed" /> -->

      </q-form>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="negative" v-close-popup />
      <q-btn flat label="Update" @click="submitForm" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  props: ['id','task'],
  data() {
    return {
      taskToSubmit: {}
    }
  },
  mounted() {
    let v = this
    v.taskToSubmit = Object.assign({}, this.task)
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    submitForm(){           
      this.$q.loading.show() 
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      })
      .then(this.$q.loading.hide())
      this.$emit('close')
    }
    
  },
}
</script>

<style>

</style>