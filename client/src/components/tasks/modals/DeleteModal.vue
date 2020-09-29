<template>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="negative" text-color="white" />
        <span class="q-ml-sm">Are you sure to delete this record?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Delete" id="btn-delete" @click="deletetask(id)" color="negative" v-close-popup />
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>  
</template>
<script>
export default {
  props: ['id'],
  methods: {
    deletetask(id){
      this.$emit('deletetask', id)
    }
  },
}
</script>