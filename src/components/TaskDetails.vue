<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <button class="btn-secondary" @click="taskStore.deleteTask(task.id)">💀 Delete</button>
      <button :class="task.isFav ? 'btn-primary' : 'btn-secondary'" @click="taskStore.toggleFav(task.id)">♥ Favorites</button>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '../store/taskStore';

const props = defineProps({
  task: Object
})

const taskStore = useTaskStore()

</script>

