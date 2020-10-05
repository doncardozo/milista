<template>
  <q-item
    @click="
      updateTask({
        id: id,
        updates: {
          id: task.id,
          title: task.title,
          complete: !task.complete,
        },
      })
    "
    :class="!task.complete ? 'bg-white-1' : 'bg-green-4'"
    v-ripple
    clickable
  >
    <q-item-section side>
      <q-checkbox color="green" v-model="task.complete" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{ 'text-strikethrough': task.complete }">{{
        task.title
      }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn
        flat
        round
        color="negative"
        icon="delete"
        @click.stop="promptToDelete(task.id)"
      />
    </q-item-section>
    <q-item-section side>
      <q-btn
        flat
        round
        color="primary"
        @click.stop="showEditTask = true"
        icon="edit"
      />
    </q-item-section>

    <q-dialog v-model="showEditTask" persistent>
      <EditTask @close="showEditTask = false" :task="task" :id="id" />
    </q-dialog>
  </q-item>
</template>

<script>
import EditTask from "../tasks/modals/EditTask";
import { mapActions } from "vuex";

export default {
  props: ["task", "id"],
  components: {
    EditTask,
  },
  data() {
    return {
      showEditTask: false,
    };
  },
  methods: {
    ...mapActions("tasks", ["deleteTask", "updateTask"]),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "confirm",
          message: "Really delete?",
          ok: {
            push: true,
          },
          cancel: {
            color: "negative",
          },
          persistent: true,
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    },
  },
};
</script>

<style>
</style>