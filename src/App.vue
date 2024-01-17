<template>
  <main>
    <!-- HEADING -->
    <header>
      <h1>🍋 <span>Lemon Task</span></h1>
    </header>

    <div class="taskform-container container">
      <TaskForm />
    </div>

    <div class="container">
      <nav class="filter">
        <button @click="filter = 'all'" :class="filter === 'all' ? 'active' : ''">All tasks</button>
        <button @click="filter = 'favs'" :class="filter === 'favs' ? 'active' : ''">Favs tasks</button>
      </nav>
    </div>

    <!-- Loading -->
    <div class="loading" v-if="loading">loading task...</div>
    
    <!-- TASK LIST -->
    <div class="container">
      
      <div class="task-list" v-if="filter === 'all'">
        <p>You have {{ totalCount }} task left todo</p>
        <div v-for="task in tasks" :key="task.id">
          <TaskDetails :task="task"/>
        </div>
      </div>

      
      <div class="task-list" v-if="filter === 'favs'">
        <p>You have {{ favCount }} task left todo</p>
        <div v-for="task in favs" :key="task.id">
          <TaskDetails :task="task"/>
        </div>
      </div>
    </div>
    
    <button @click="taskStore.$reset">Reset State</button>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue';
import { useTaskStore } from './store/taskStore';
import TaskForm from './components/TaskForm.vue';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore()

const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore)
// FETCH TASK FROM API
taskStore.getTasks()
const filter = ref('all')                               

</script>
