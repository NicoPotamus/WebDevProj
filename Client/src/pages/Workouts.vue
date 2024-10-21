<script setup lang="ts">
import { ref } from 'vue'
import { type Workout, type WorkObj } from '../model/workoutModel'
import { getAll, type Exercise } from '../model/exercises'

const userWorkouts = ref<Workout[]>([
  {
    name: 'ChoO cHOo cAlOo',
    sets: 4,
    exercises: [
      {
        exercise: {
          name: '90/90 Hamstring',
          force: 'push',
          level: 'beginner',
          mechanic: null,
          equipment: 'body only',
          primaryMuscles: ['hamstrings'],
          secondaryMuscles: ['calves'],
          instructions: [
            'Lie on your back, with one leg extended straight out.',
            'With the other leg, bend the hip and knee to 90 degrees. You may brace your leg with your hands if necessary. This will be your starting position.',
            'Extend your leg straight into the air, pausing briefly at the top. Return the leg to the starting position.',
            'Repeat for 10-20 repetitions, and then switch to the other leg.',
          ],
          category: 'stretching',
        },
        reps: 15,
      },
    ],
  },
])
const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

//--------------in modal-------------------------------------------------
const modalWorkout = ref<Workout>({
  name: '',
  sets: 0,
  exercises: [],
})

const exercisesInModal = ref<WorkObj[]>([])
const dropdownState = ref<boolean[]>([])

function addExercise() {
  exercisesInModal.value.push({ exercise: null, reps: 0 })
  dropdownState.value.push(false)
}

function addWorkout() {
  modalWorkout.value.exercises.push(...exercisesInModal.value)
  userWorkouts.value.push(modalWorkout.value)
  console.log(modalWorkout.value)
  modalWorkout.value = {
    name: '',
    sets: 0,
    exercises: [],
  }
  dropdownState.value = []
  closeModal()
}

function editWorkout(workout: Workout) {
  modalWorkout.value = { ...workout }
  exercisesInModal.value = workout.exercises.map(ex => ({ ...ex }))
  dropdownState.value = workout.exercises.map(() => false)
  openModal()
}

function deleteWorkout(workout: Workout) {
  const index = userWorkouts.value.findIndex(w => w.name === workout.name)
  if (index !== -1) {
    userWorkouts.value.splice(index, 1)
  }
}
//----------------------in dropdown----------------------------------------

const panelTabs = ref([
  { active: true, name: 'All' },
  { active: false, name: 'Chest' },
  { active: false, name: 'Back' },
  { active: false, name: 'Arms' },
  { active: false, name: 'Legs' },
  { active: false, name: 'Abs' },
])

const allExercises = getAll().data
const displayedExercise = ref<Exercise[]>(allExercises)

function updateTab(index: number) {
  panelTabs.value.forEach((tab, i) => {
    tab.active = i === index
  })
}

function filterAll() {
  displayedExercise.value = allExercises
  updateTab(0)
}

function filterChest() {
  displayedExercise.value = allExercises.filter(exercise =>
    exercise.primaryMuscles.includes('chest'),
  )
  updateTab(1)
}

function filterBack() {
  displayedExercise.value = allExercises.filter(
    exercise =>
      exercise.primaryMuscles.includes('lower back') ||
      exercise.primaryMuscles.includes('upper back') ||
      exercise.primaryMuscles.includes('lats') ||
      exercise.primaryMuscles.includes('traps'),
  )
  updateTab(2)
}

function filterArms() {
  displayedExercise.value = allExercises.filter(
    exercise =>
      exercise.primaryMuscles.includes('shoulders') ||
      exercise.primaryMuscles.includes('biceps') ||
      exercise.primaryMuscles.includes('triceps') ||
      exercise.primaryMuscles.includes('forearms'),
  )
  updateTab(3)
}

function filterLegs() {
  displayedExercise.value = allExercises.filter(
    exercise =>
      exercise.primaryMuscles.includes('quadriceps') ||
      exercise.primaryMuscles.includes('hamstrings') ||
      exercise.primaryMuscles.includes('calves') ||
      exercise.primaryMuscles.includes('glutes'),
  )
  updateTab(4)
}

function filterAbs() {
  displayedExercise.value = allExercises.filter(exercise =>
    exercise.primaryMuscles.includes('abdominals'),
  )
  updateTab(5)
}
</script>

<template>
  <div>
    <section class="hero is-success">
      <div class="hero-body">
        <p class="title">My Workouts</p>
      </div>
    </section>
  </div>
  <div class="section">
    <div id="app">
      <nav class="panel">
        <p class="panel-heading">Current Workouts</p>
        <a
          class="panel-block is-block"
          v-for="workout in userWorkouts"
          :key="workout.name"
          @click="editWorkout(workout)"
        >
              <span class="panel-icon">
                <i class="fa-solid fa-dumbbell"></i>
              </span>
              {{ workout.name }}
            <div class="buttons is-right">
                <button class="delete" @click.stop="deleteWorkout(workout)"></button>
            </div>
        </a>

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
              <label class="label">Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Text input"
                  v-model="modalWorkout.name"
                />
              </div>
            </div>
            <div
              class="box"
              v-for="(exercise, index) in exercisesInModal"
              :key="index"
            >
              <div class="field">
                <label class="label">Exercise</label>
                <div class="control">
                  <div
                    class="dropdown"
                    :class="{ 'is-active': dropdownState[index] }"
                  >
                    <div
                      class="dropdown-trigger"
                      @click="dropdownState[index] = !dropdownState[index]"
                    >
                      <button
                        class="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                      >
                        <span v-if="exercise.exercise === null">Exercise</span>
                        <span v-else>{{ exercise.exercise.name }}</span>
                        <span class="icon is-small">
                          <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <nav class="panel">
                          <p class="panel-tabs">
                            <a
                              @click="filterAll"
                              :class="{ 'is-active': panelTabs[0].active }"
                              >All</a
                            >
                            <a
                              @click="filterChest"
                              :class="{ 'is-active': panelTabs[1].active }"
                              >Chest</a
                            >
                            <a
                              @click="filterBack"
                              :class="{ 'is-active': panelTabs[2].active }"
                              >Back</a
                            >
                            <a
                              @click="filterArms"
                              :class="{ 'is-active': panelTabs[3].active }"
                              >Arms</a
                            >
                            <a
                              @click="filterLegs"
                              :class="{ 'is-active': panelTabs[4].active }"
                              >Legs</a
                            >
                            <a
                              @click="filterAbs"
                              :class="{ 'is-active': panelTabs[5].active }"
                              >Abs</a
                            >
                          </p>
                          <a
                            class="panel-block"
                            v-for="exerciseOption in displayedExercise"
                            :key="exerciseOption.name"
                            @click="exercise.exercise = exerciseOption"
                          >
                            {{ exerciseOption.name }}
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Reps</label>
                <div class="control">
                  <input
                    class="input"
                    type="number"
                    placeholder="Text input"
                    v-model="exercise.reps"
                  />
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Sets</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="Text input"
                  v-model="modalWorkout.sets"
                />
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="buttons">
              <button class="button is-success" @click="addWorkout">
                Save changes
              </button>
              <button class="button" @click="closeModal">Cancel</button>
              <button class="button" @click="addExercise">Add Exercise</button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
