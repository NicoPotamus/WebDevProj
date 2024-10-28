<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { emptyStats, type User } from '@/model/user'
import type { Workout } from '@/model/workoutModel'
import { ref } from 'vue'
import NicoPhoto from '../assets/NicoPhoto.jpg'
import JohnPhoto from '../assets/JohnPhoto.jpg'

const selectedFriend = ref<User>({
  firstName: '',
  lastName: '',
  dob: new Date(),
  email: '',
  password: '',
  biography: '',
  photo: '',
  workouts: [],
  following: [],
  username: '',
  id: 0,
  stats: emptyStats,
  admin: false,
})

const friends = ref<User[]>([
  {
    firstName: 'Nico',
    lastName: 'DeMilio',
    dob: new Date('1999-09-19'),
    email: 'NicoDeMilio@email.com',
    password: 'password',
    biography: 'I am a student at SUNY new paltz',
    photo: NicoPhoto,
    workouts: [
      {
        name: 'ChoO cHOo cAlOo',
        sets: 4,
        exercises: [
          {
            exercise: {
              name: '90/90 Hamstring',
              equipment: 'body only',
              primaryMuscles: ['hamstrings'],
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
    ],
    following: [],
    username: 'NicoD',
    id: 1,
    stats: emptyStats,
    admin: false,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date('1999-09-19'),
    email: 'coolBeans@email.com',
    password: 'password',
    biography: 'I am a student at SUNY new paltz',
    photo: JohnPhoto,
    workouts: [
      {
        name: 'ChoO cHOo cAlOo',
        sets: 4,
        exercises: [
          {
            exercise: {
              name: '90/90 Hamstring',
              equipment: 'body only',
              primaryMuscles: ['hamstrings'],
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
    ],
    following: [],
    username: 'JohnD',
    id: 2,
    stats: emptyStats,
    admin: false,
  },
])

function selectFriend(friend: User) {
  selectedFriend.value = friend
}

//for dropdown inside card
const dropdownState = ref(false)
function toggleDropdown() {
  dropdownState.value = !dropdownState.value
}
const workoutref = ref<Workout>()

//for workout modal
const isModalOpen = ref(false)

function viewWorkout(workout: Workout) {
  workoutref.value = workout
  isModalOpen.value = true
}
</script>

<template>
  <div class="hero is-link">
    <div class="hero-body">
      <p class="title">My Friends</p>
    </div>
  </div>

  <section class="section">
    <div class="columns">
      <div class="column is-two-fifths">
        <aside class="menu">
          <p class="menu-label">Friends</p>
          <ul class="menu-list" v-for="friend in friends" :key="friend.email">
            <li>
              <a @click="selectFriend(friend)"
                >{{ friend.firstName }} {{ friend.lastName }}</a
              >
            </li>
          </ul>
        </aside>
      </div>
      <div class="column is-three-fifths">
        <div class="card">
          <div class="card-image">
            <figure v-if="selectedFriend.photo === ''" class="image is-4by3">
              <img
                src="https://bulma.io/assets/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
            <figure v-else class="image is-4by3">
              <img :src="selectedFriend.photo" alt="Placeholder image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure
                  v-if="selectedFriend.photo === ''"
                  class="image is-48x48"
                >
                  <img
                    src="https://bulma.io/assets/images/placeholders/1280x960.png"
                    alt="Placeholder image"
                  />
                </figure>
                <figure v-else class="image is-48x48">
                  <img :src="selectedFriend.photo" alt="Placeholder image" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">
                  {{ selectedFriend.firstName }} {{ selectedFriend.lastName }}
                </p>
                <p class="subtitle is-6">@{{ selectedFriend.username }}</p>
              </div>
            </div>
            <div class="content">{{ selectedFriend.biography }}</div>
            <div class="dropdown" :class="{ 'is-active': dropdownState }">
              <div class="dropdown-trigger" @click="toggleDropdown()">
                <button class="card-header-icon" aria-label="more options">
                  <p class="card-header-title">Workouts</p>
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div
                  class="card-content"
                  v-for="workout in selectedFriend.workouts"
                  :key="workout.name"
                >
                  <div class="content">
                    <div class="dropdown-content">
                      <a class="dropdown-item" @click="viewWorkout(workout)">
                        {{ workout.name }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="modal" :class="{ 'is-active': isModalOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ workoutref?.name }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="isModalOpen = !isModalOpen"
        ></button>
      </header>
      <section
        class="modal-card-body"
        v-for="exercise in workoutref?.exercises"
        :key="exercise.exercise?.name"
      >
        <div class="box">
          <p class="title is-4">
            {{ exercise.exercise?.name }}
          </p>
          <br />
          <p class="subtitle is-6">
            <b>Equipment</b>: {{ exercise.exercise?.equipment }}
          </p>
          <p class="subtitle is-6">
            <b>Primary Muscles</b>: {{ exercise.exercise?.primaryMuscles }}
          </p>
          <p><b>Instructions</b>:</p>
          <div
            v-for="instruction in exercise.exercise?.instructions"
            :key="instruction"
          >
            <p>{{ instruction }}</p>
          </div>
          <p class="subtitle is-6"><b>Reps</b>: {{ exercise.reps }}</p>
        </div>
        <p><b>Sets</b> {{ workoutref?.sets }}</p>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button" @click="isModalOpen = !isModalOpen">
            Done
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
