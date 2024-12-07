<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { getFollowing } from '@/model/following';
import { emptyStats, type User } from '@/model/user'
import { getOne, type Workout } from '@/model/workoutModel'
import { ref } from 'vue'

import { refUser }from '@/model/sesssion'

const user = refUser()

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
  stats: emptyStats(),
  admin: false,
})

const friends = ref<User[]>([])
if (user && user.value) {
  getFollowing(user.value.id).then((following) => {
    friends.value = following.data
  })
}

function selectFriend(friend: User) {
  selectedFriend.value = friend
}

//for dropdown inside card
const dropdownState = ref(false)
function toggleDropdown() {
  dropdownState.value = !dropdownState.value
}
const workoutref = ref<Workout>()

function viewWorkout(workout: Workout) {
  getOne(selectedFriend.value.id, workout.id).then((workout) => {
    workoutref.value = workout.data
  })
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
                src="../assets/UserIcon.png"
                alt="Placeholder image"
              />
            </figure>
            <figure v-else class="image is-square">
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
                    src="../assets/UserIcon.png"
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
                    <!-- TODO: FIX HERE-->
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
  <!-- If workoutref is null then it is falsy. i.e. it acts as false. When it has a value, then it reurns true-->
  <div class="modal" :class="{ 'is-active': workoutref }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ workoutref?.name }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="workoutref = undefined"
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
          <button class="button" @click="workoutref = undefined">
            Done
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
