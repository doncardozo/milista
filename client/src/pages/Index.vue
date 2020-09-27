<template>
  <q-page class="flex">     
    <List :tasks="tasks" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script>

import { axiosInstance } from 'boot/axios'
import List from '../components/tasks/List'

export default {
  name: 'PageIndex',
  components: {
    List
  },
  data(){
    return {
      tasks: []
    }
  },
  created(){
    axiosInstance.get('/api/task-list/')
    .then((resp) => {
      this.tasks = resp.data      
    })
    .catch((err) => console.error(err))
  }
}
</script>
