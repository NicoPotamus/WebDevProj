<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
//import type { User } from '@/model/user'
import { userNico } from '@/model/user'
import type { Workout } from '@/model/workoutModel'

const user = ref(userNico)

const curr = new Date() // get current date
const first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week

const sundayDate = new Date(curr.setDate(first)).toDateString()
const weeklyStats = ref<number[]>([0, 0, 0, 0, 0, 0, 0])

compileStats()

function compileStats() {
  for (let i = 0; i < 7; i++) {
    const date = new Date(curr.setDate(first + i)).toDateString()

    if (user.value.stats?.recordedWorkouts.has(date)) {
      weeklyStats.value[i] = user.value.stats.recordedWorkouts.get(date).length
    } else {
      user.value.stats?.recordedWorkouts.set(date, [])
    }
    console.log(date)
    console.log(weeklyStats.value[i])
  }
}

//Log a workout
const workoutDate = ref('')
const workoutPerformed = ref<Workout>()

function logWorkout() {
  if (workoutDate.value && workoutPerformed.value) {
    if (user.value.stats?.recordedWorkouts.has(workoutDate.value)) {
      user.value.stats?.recordedWorkouts
        .get(workoutDate.value)
        .push(workoutPerformed.value)
    } else {
      user.value.stats?.recordedWorkouts.set(workoutDate.value, [
        workoutPerformed.value,
      ])
    }
  }
  compileStats()
}

//Dropdown
const dropdownState = ref(false)
function toggleDropdown() {
  dropdownState.value = !dropdownState.value
}

function setWorkout(workout: Workout) {
  workoutPerformed.value = workout
  toggleDropdown()
}
</script>

<template>
  <section class="hero is-link">
    <div class="hero-body">
      <p class="title">Welcome {{ user.firstName }}</p>
    </div>
  </section>

  <div class="columns">
    <div class="column is-half">
      <div class="box">
        <section class="hero">
          <div class="hero-body">
            <p class="title">Weekly Stats</p>
            <p class="subtitle">Week of: {{ sundayDate.substring(4) }}</p>
          </div>
        </section>

        <p>Sunday</p>
        <progress class="progress" :value="weeklyStats[0]" max="3">
          15%
        </progress>

        <p>Monday</p>
        <progress class="progress" :value="weeklyStats[1]" max="3">
          15%
        </progress>

        <p>Tuesday</p>
        <progress class="progress" :value="weeklyStats[2]" max="3">
          15%
        </progress>

        <p>Wednesday</p>
        <progress class="progress" :value="weeklyStats[3]" max="3">
          15%
        </progress>

        <p>Thursday</p>
        <progress class="progress" :value="weeklyStats[4]" max="3">
          15%
        </progress>

        <p>Friday</p>
        <progress class="progress" :value="weeklyStats[5]" max="3">
          15%
        </progress>

        <p>Saturday</p>
        <progress class="progress" :value="weeklyStats[6]" max="3">
          15%
        </progress>
      </div>
    </div>
    <div class="column is-half">
      <div class="box">
        <section class="hero">
          <h2 class="title">Personal Records</h2>
          <span></span>
          <p class="subtitle">
            DeadLift: <b>{{ user.stats ? user.stats.deadlift : '0' }}</b>
          </p>
          <p class="subtitle">
            Bench: <b>{{ user.stats ? user.stats.bench : '0' }}</b>
          </p>
          <p class="subtitle">
            Squat: <b>{{ user.stats ? user.stats.squat : '0' }}</b>
          </p>
        </section>
      </div>
      <div class="box">
        <section class="hero">
          <h2 class="title">Record Workout</h2>
          <span></span>
        </section>

        <div class="block">
          <div class="dropdown" :class="{ 'is-active': dropdownState }">
            <div class="box">
              <div class="dropdown-trigger" @click="toggleDropdown()">
                <button class="card-header-icon" aria-label="more options">
                  <p class="card-header-title">
                    {{ workoutPerformed ? workoutPerformed.name : 'Workouts' }}
                  </p>
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div
                  class="card-content"
                  v-for="workout in user.workouts"
                  :key="workout.name"
                >
                  <div class="content">
                    <div class="dropdown-content">
                      <a class="dropdown-item" @click="setWorkout(workout)">
                        {{ workout.name }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label" for="date"> Date </label>
          <input type="date" class="input" v-model="workoutDate" />
        </div>

        <button class="button is-primary" @click="logWorkout()">
          Log Workout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
