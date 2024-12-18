<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { refUser } from '@/model/sesssion'
import { getStats, type Stats, updateStats, updateStats as updateUserStats } from '@/model/user'
import { getAll, type Workout } from '@/model/workoutModel'
import UpdateRecords from '@/components/UpdateRecords.vue';
import { useRouter } from 'vue-router';

const user = refUser()
 const router = useRouter()
if(!user.value){
  console.log('user is null')
  router.push('/signin')
}

const userStats = ref<Stats>({
  recordedWorkouts: {},
  deadlift: 0,
  bench: 0,
  squat: 0,
  id: 1,
})

const weeklyStats = ref<number[]>([0, 0, 0, 0, 0, 0, 0])

async function loadStats() {
  if (user.value) {
    const response = await getStats(user.value.stats_id ?? 0)//Error is false 
    userStats.value = response.data
    user.value.stats = response.data
    console.log('user stats:', response)
  }
}
async function loadWorkouts() {
  if (user.value) {
    const response = await getAll(user.value.id)
    user.value.workouts = response.data
    console.log('userWorkouts:', user.value.workouts)
  }
}

const today = new Date() // get current date
const sDay = today.getDate() - today.getDay()
const sundayDate = new Date(today.setDate(sDay)).toDateString()
console.log('sundayDate', sundayDate)

function stringifyDate(date: Date): string {
  const str =
    '' +
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  return str
}

function compileStats() {
  if (!userStats.value) return

  const workouts = userStats.value.recordedWorkouts
  const curr = new Date()
  const first = curr.getDate() - curr.getDay() // Get the first day of the current week (Monday)

  for (let i = 0; i < 7; i++) {
    const date = new Date(curr)
    date.setDate(first + i)
    const dateString = stringifyDate(date)
    console.log('dateString', dateString)
    weeklyStats.value[i] = workouts[dateString]?.length || 0
  }
}

//Log a workout
const workoutDate = ref<string>('') //default date of today
const workoutPerformed = ref<Workout>()

async function logWorkout() {
  console.log('workout DAte', workoutDate.value)

  if (workoutDate.value && workoutPerformed.value) {
    const workouts = userStats.value?.recordedWorkouts[workoutDate.value] //get completed workouts for given day
    if (workouts) {
      workouts.push(workoutPerformed.value.id)
      if (userStats.value && userStats.value.recordedWorkouts) {
        userStats.value.recordedWorkouts[workoutDate.value] = workouts
      }
    } else {
      if (userStats.value && userStats.value.recordedWorkouts) {
        userStats.value.recordedWorkouts[workoutDate.value] = [
          workoutPerformed.value.id,
        ]
      }
    }
    if (userStats.value?.id !== undefined) {
      await updateUserStats(userStats.value.id, userStats.value)
      console.log('logged workout')
    }
  }
  compileStats()
  workoutDate.value = ''
  workoutPerformed.value = undefined
  console.log('userWorkouts: after addition', userStats.value?.recordedWorkouts)
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

//--------------------------------update Personal Records----------------------
const editStat = ref(false)
async function updatePersonalStats(){
  if(userStats.value?.id !== undefined){
    await updateStats(userStats.value.id, userStats.value)
    console.log('updated stats')
  }
  editStat.value = false
}


onMounted(async () => {
  await loadStats()
  loadWorkouts()
  compileStats()
})
</script>

<template>
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
          <div class="button" @click="editStat = true">Update Recs</div>
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
                      {{
                        workoutPerformed ? workoutPerformed.name : 'Workouts'
                      }}
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
  <div class="modal" :class="{ 'is-active': editStat }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Personal Records</p>
        </header>
        <section class="modal-card-body">
          <UpdateRecords v-if="user?.stats" :stats="user.stats" />
          <button
            class="modal-close is-large"
            aria-label="close"
            @click="editStat = false"
          ></button>
          <button class="button is-success" @click="updatePersonalStats()">Save</button>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
