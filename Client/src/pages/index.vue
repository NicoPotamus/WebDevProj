<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import type { Workout } from '@/model/workoutModel'
import { refUser } from '@/model/sesssion';
import { useRouter } from 'vue-router';

const router = useRouter()
const user = refUser();
if(!user.value) {
  router.push('/Signin')
}
const userStats = user.value!.stats

const curr = new Date() // get current date
const first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week

const sundayDate = new Date(curr.setDate(first)).toDateString()
const weeklyStats = ref<number[]>([0, 0, 0, 0, 0, 0, 0])

compileStats()

function findWorkoutsByDate(
  map: Map<Date, Workout[]>,
  targetDate: Date,
): Workout[] | null {
  for (const [key, value] of map.entries()) {
    console.log('targetData:', targetDate)
    console.log('targetData constructor:', targetDate.constructor.name)
    console.log('type of targetData:', typeof targetDate)
    if (key === targetDate) {
      return value
    }
  }
  return null // Or any default value
}

function compileStats() {
  for (let i = 0; i < 7; i++) {
    const date = new Date(curr.setDate(first + i)) //Date form not matching the date constructor

    if (findWorkoutsByDate(userStats?.recordedWorkouts, date)) {
      weeklyStats.value[i] =
        findWorkoutsByDate(userStats?.recordedWorkouts, date)?.length ?? 0
    } else {
      userStats?.recordedWorkouts.set(date, [])
    }
    //console.log(date)
    //console.log(weeklyStats.value[i])
  }
}

//Log a workout
const workoutDate = ref<string>('') //default date of today
const workoutPerformed = ref<Workout>()

function logWorkout() {
  if (workoutDate.value && workoutPerformed.value) {
    const date = new Date(workoutDate.value)
    date.setHours(0, 0, 0, 0)
    if (findWorkoutsByDate(userStats?.recordedWorkouts, date)) {
      const workouts =
        findWorkoutsByDate(userStats?.recordedWorkouts, date) ?? []
      workouts.push(workoutPerformed.value)
      userStats?.recordedWorkouts.set(date, workouts)
    } else {
      userStats?.recordedWorkouts.set(date, [workoutPerformed.value])
    }
  }
  compileStats()
  //console.log('workout Date Before', workoutDate.value)
  //console.log('workout Date Before type', typeof workoutDate.value)
  workoutDate.value = ''
  //console.log('workout Date after', workoutDate.value)
  //console.log('workout Date after type', typeof workoutDate.value)
  workoutPerformed.value = undefined
  console.log('userWorkouts:', userStats?.recordedWorkouts)
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

<template >
  <div v-if="user">
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
</div>
</template>

<style scoped></style>
