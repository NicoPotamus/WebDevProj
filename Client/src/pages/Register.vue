<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import PersonalInfo from '../components/PersonalInfo.vue'
import { emptyStats, type User } from '../model/user'

// Define the user object with the correct type
const user = ref<User>({
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
</script>

<template>
  <div>
    <section class="hero is-link">
      <div class="hero-body">
        <p class="title">Sign Up</p>
      </div>
    </section>
    <PersonalInfo :user="user" />
    <div class="buttons">
      <div class="button">Create Account</div>
    </div>
  </div>
</template>

<style scoped>
/* Your scoped CSS here */
</style>
