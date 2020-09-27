<template>
  <div class="q-pa-md" style="width: 100%">
    <q-list bordered padding>
      
      <q-item-label header>Tasks List <span style="color: red" v-if="!tasks.length">(No tasks!)</span></q-item-label>

      <q-item v-for="task in tasks" :key="task.id" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{task.title}}</q-item-label>
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
  created() {
    
  }
}
</script>