<template>
  <q-card style="width: 80%">
    <q-card-section>
      <div class="text-h6">Add Task</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form              
        class="q-gutter-md"
        >
        
        <q-input
          filled
          v-model="title"
          label="Task Title"
          hint="Task title..."
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      
        <q-toggle v-model="complete" label="Completed" />

      </q-form>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="negative" v-close-popup />
      <q-btn flat label="Save" @click="onSubmit" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      complete: false
    }
  },
  methods: {
    onSubmit(){      
      this.$emit('savetask', {
        title:this.title,
        complete:this.complete
      })
    }
  },
}
</script>

<style>

</style>