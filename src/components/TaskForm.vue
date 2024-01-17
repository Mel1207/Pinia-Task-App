<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <input type="text" placeholder="I need to..." v-model="newTask" class="task-input">
    <button class="btn-secondary">add task</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../store/taskStore'

  const taskStore = useTaskStore()

  const newTask = ref('')

  const handleSubmit = () => {
    if(!newTask.value) {
      console.log('please add task')
      return
    }
    console.log(newTask.value)

    taskStore.addTask({
      title: newTask.value, 
      isFav: false,
      id: Math.floor(Math.random() * 10000).toString()
    })

    console.log('new task added')
    console.log(newTask.value)
    newTask.value = ''
  }
</script>

