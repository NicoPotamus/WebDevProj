<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { getAll as getAllWorkouts, create, remove, update, type Workout, type WorkObj } from '../model/workoutModel'
import { getAll as getAllExercises, type Exercise } from '../model/exercises'
import { refUser } from '../model/sesssion'
import type { DataEnvelope } from '@/model/dataEnvelope';

const user = refUser()
const userWorkouts = ref<Workout[]>([])

async function loadWorkouts() {
  if (user.value) {
    const response = await getAllWorkouts(user.value.id)
    userWorkouts.value = response.data
    console.log('userWorkouts:', userWorkouts.value)
  }
}

loadWorkouts()

const isModalOpen = ref(false)
const isEditing = ref(false)

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  resetModal()
}

function resetModal() {
  modalWorkout.value = {
    name: '',
    sets: 0,
    exercises: [],
    id: 0
  }
  exercisesInModal.value = []
  dropdownState.value = []
  isEditing.value = false
}

const modalWorkout = ref<Workout>({
  name: '',
  sets: 0,
  exercises: [],
  id: 0
})

const exercisesInModal = ref<WorkObj[]>([])
const dropdownState = ref<boolean[]>([])

function addExercise() {
  exercisesInModal.value.push({ exercise: null, reps: 0 })
  dropdownState.value.push(false)
}

async function addWorkout() {
  try {
    if (!modalWorkout.value.name || modalWorkout.value.sets <= 0 || exercisesInModal.value.length === 0) {
      console.error('Please fill all required fields')
      return
    }

    // Validate exercises
    if (exercisesInModal.value.some(ex => !ex.exercise || ex.reps <= 0)) {
      console.error('Please complete all exercise fields')
      return
    }

    const workoutToSave = {
      ...modalWorkout.value,
      exercises: exercisesInModal.value
    }

    let response : DataEnvelope<Workout>
    if (isEditing.value) {
      response = await update(user.value?.id ?? 0, workoutToSave.id, workoutToSave)
      console.log('using create')
    } else {
      response = await create(user.value?.id ?? 0, workoutToSave)
      console.log('using create')
    }

    if (response.isSuccess) {
      await loadWorkouts() // Reload all workouts to get fresh data
      closeModal()
    } else {
      console.error('Error saving workout:', response.error)
    }
  } catch (error) {
    console.error('Error saving workout:', error)
  }
}

function editWorkout(workout: Workout) {
  modalWorkout.value = { ...workout }
  exercisesInModal.value = workout.exercises.map(ex => ({ ...ex }))
  dropdownState.value = workout.exercises.map(() => false)
  isEditing.value = true
  openModal()
}

async function deleteWorkout(workout: Workout) {
  const removeWorkout = await remove(user.value?.id ?? 0, workout.id)
  if (removeWorkout.isSuccess) {
    await loadWorkouts()
  } else {
    console.error('Error deleting workout:', removeWorkout.error)
  }
}

const panelTabs = ref([
  { active: true, name: 'All' },
  { active: false, name: 'Chest' },
  { active: false, name: 'Back' },
  { active: false, name: 'Arms' },
  { active: false, name: 'Legs' },
  { active: false, name: 'Abs' },
])

const allExercises = ref<Exercise[]>([])
const displayedExercise = ref<Exercise[]>([])

getAllExercises().then((data) => {
  allExercises.value = data.data
  displayedExercise.value = data.data
})

function updateTab(index: number) {
  panelTabs.value.forEach((tab, i) => {
    tab.active = i === index
  })
}

function filterAll() {
  displayedExercise.value = allExercises.value
  updateTab(0)
}

function filterChest() {
  displayedExercise.value = allExercises.value.filter(exercise =>
    exercise.primaryMuscles.includes('chest'),
  )
  updateTab(1)
}

function filterBack() {
  displayedExercise.value = allExercises.value.filter(
    exercise =>
      exercise.primaryMuscles.includes('lower back') ||
      exercise.primaryMuscles.includes('upper back') ||
      exercise.primaryMuscles.includes('lats') ||
      exercise.primaryMuscles.includes('traps'),
  )
  updateTab(2)
}

function filterArms() {
  displayedExercise.value = allExercises.value.filter(
    exercise =>
      exercise.primaryMuscles.includes('shoulders') ||
      exercise.primaryMuscles.includes('biceps') ||
      exercise.primaryMuscles.includes('triceps') ||
      exercise.primaryMuscles.includes('forearms'),
  )
  updateTab(3)
}

function filterLegs() {
  displayedExercise.value = allExercises.value.filter(
    exercise =>
      exercise.primaryMuscles.includes('quadriceps') ||
      exercise.primaryMuscles.includes('hamstrings') ||
      exercise.primaryMuscles.includes('calves') ||
      exercise.primaryMuscles.includes('glutes'),
  )
  updateTab(4)
}

function filterAbs() {
  displayedExercise.value = allExercises.value.filter(exercise =>
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
          :key="workout.id"
          @click="editWorkout(workout)"
        >
          <span class="panel-icon">
            <i class="fa-solid fa-dumbbell"></i>
          </span>
          {{ workout.name }}
          <div class="buttons is-right">
            <button
              class="delete"
              @click.stop="deleteWorkout(workout)"
            ></button>
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
            <p class="modal-card-title">{{ isEditing ? 'Edit Workout' : 'Create Workout' }}</p>
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
                  placeholder="Workout name"
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
                        <span v-if="exercise.exercise === null">Select Exercise</span>
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
                            @click="
                              () => {
                                exercise.exercise = exerciseOption
                                dropdownState[index] = false
                              }
                            "
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
                    placeholder="Number of reps"
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
                  placeholder="Number of sets"
                  v-model="modalWorkout.sets"
                />
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="buttons">
              <button class="button is-success" @click="addWorkout">
                {{ isEditing ? 'Update' : 'Save' }}
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