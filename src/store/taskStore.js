import { defineStore } from "pinia"


export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      // { id: 1, title: 'buy some snacks', isFav: true},
      // { id: 2, title: 'code with pinia', isFav: false},
      // { id: 3, title: 'create vue portfolio', isFav: true},
    ],
    loading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter(item => item.isFav) 
    },
    fav() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p
      }, 0)
    },
    totalCount: (state) => {
      return state.tasks.length
    },
  },
  actions: {
    async getTasks() {
      this.loading = true
      const res = await fetch('http://localhost:3000/tasks')
      const data = await res.json()

      this.tasks = data
      this.loading = false
    },
    async addTask(task) {
      this.tasks.push(task)

      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json'}
      })

      if(res.error) {
        console.log(res.error)
      }
    },
    // addTask(task) {
    //   this.tasks.push(task)
    // },
    async deleteTask(id) {
      this.tasks = this.tasks.filter(item => {
        console.log(typeof id)
        return item.id !== id
      })

      const res = await fetch('http://localhost:3000/tasks/'+ id, {
        method: 'DELETE',
      })

      if(res.error) {
        console.log(res.error)
      }
    },
    // deleteTask(id) {
    //   this.tasks = this.tasks.filter(item => {
    //     return item.id !== id
    //   })
    // },
    async toggleFav(id) {
      const task = this.tasks.find(item => item.id === id)
      task.isFav = !task.isFav

      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ isFav: task.isFav }),
        headers: {'Content-Type': 'application/json'}
      })

      if(res.error) {
        console.log(res.error)
      }
    }
    // toggleFav(id) {
    //   const task = this.tasks.find(item => item.id === id)
    //   task.isFav = !task.isFav
    // }
  }
})