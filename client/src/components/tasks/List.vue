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
          <q-btn flat round color="negative" @click="deletetask(task.id)" icon="delete" />
        </q-item-section>
        <q-item-section side >
          <q-btn flat round color="primary" icon="edit" />
        </q-item-section>
        <q-item-section side >
          <q-checkbox color="green" v-model="task.complete" />
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>
<script>
export default {
  props: ['tasks'],
  computed: {
    
  },
  methods: {
    deletetask(id){
      this.$emit('deletetask', id)
    }
  },
}
</script>