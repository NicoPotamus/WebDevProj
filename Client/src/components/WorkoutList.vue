<script  setup lang="ts">
    import { ref } from 'vue';

    const list = ref([
      { task: 'Make To Do List', date: '9/19/2024', completed: false },
      { task: 'Learn Vue', date: '10/21/2024', completed: false },
    ]);
    const completedList = ref<{ task: string; date: string; completed: boolean }[]>([]);
    const isModalOpen = ref(false);
    const newTask = ref('');
    const newDate = ref('');

    function openModal() {
      isModalOpen.value = true;
    }

    function closeModal() {
      isModalOpen.value = false;
    }

    function addTask() {
      if (newTask.value && newDate.value) {
        list.value.push({ task: newTask.value, date: newDate.value, completed: false });
        newTask.value = '';
        newDate.value = '';
        closeModal();
      }
    }

    function completeTask(task: { task: string; date: string; completed: boolean }) {
      task.completed = !task.completed;
      list.value = list.value.filter(item => item.task !== task.task);
      completedList.value.push(task);
    }

    //---------------------------------- end List, start exercises


</script>

<template>
  
  <div class="section">
    <div id="app">
      <nav class="panel">
        <p class="panel-heading">Current Workouts</p>
        <label v-for="item in list" :key="item.task" class="panel-block is-block">
          <input
            type="checkbox"
            v-model="item.completed"
            @change="completeTask(item)"
          />
          {{ item.task }}
          <span class="tag is-info is-pulled-right">{{ item.date }}</span>
        </label>
        <div class="panel-block">
          <button
            class="button is-link is-outlined is-fullwidth"
            @click="openModal"
          >
            Add Workout
          </button>
        </div>
      </nav>
      <div class="modal" :class="{ 'is-active': isModalOpen }">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Task</p>
            <button
              class="delete"
              @click="closeModal"
              aria-label="close"
            ></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label">Task</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Text input"
                  v-model="newTask"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Date</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="mm/dd/yyyy"
                  v-model="newDate"
                />
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="buttons">
              <button class="button is-success" @click="addTask">
                Save changes
              </button>
              <button class="button" @click="closeModal">Cancel</button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
