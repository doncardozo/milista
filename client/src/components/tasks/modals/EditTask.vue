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
          filled
          v-model="task.title"
          label="Task Title"
          hint="Task title..."
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      
        <q-toggle v-model="task.complete" label="Completed" />

      </q-form>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="negative" v-close-popup />
      <q-btn flat label="Update" @click="onSubmit(task)" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import { axiosInstance } from '../../../boot/axios'

export default {
  props: ['task'],
  data() {
    return {
      title: '',
      complete: false
    }
  },
  computed: {
    isCompleted(){
      return this.task.complete
    }
  },
  methods: {
    onSubmit(o){      
      this.$q.loading.show()
      axiosInstance
      .put(`/api/task-update/${o.id}/`, o)
      .then((resp) => {
        this.$q.notify({
          message: 'successfull',
          color: 'green'
        })
        this.$parent.$emit('getist')
      })
      .catch(err => {
        this.$q.notify({
          message: 'Error',
          color: 'negative'
        })
        this.$q.loading.hide()
      })
    },

  },
}
</script>

<style>

</style>