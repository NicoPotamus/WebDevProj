<script setup lang="ts">
import { refUser, signOut } from '@/model/sesssion';
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
const user = refUser()

</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/" />

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        :class="{ 'is-active': isOpen }"
        @click="isOpen = !isOpen"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isOpen }">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/"> Home </RouterLink>
        <RouterLink class="navbar-item" to="/workouts"> Workouts </RouterLink>
        <RouterLink class="navbar-item" to="/friends"> Friends </RouterLink>
        <RouterLink class="navbar-item" to="/settings"> Settings </RouterLink>
        <RouterLink v-if="user?.admin" class="navbar-item" to="/admin">
          Admin
        </RouterLink>
      </div>

      <div class="navbar-end">

        <div v-if="user" class="navbar-item">
          <button class="button is-danger" @click="signOut()">
            <strong>Log Out</strong>
          </button>
        </div>

        <div v-else class="navbar-item">
          <RouterLink class="button is-light" to="/signin">
              Log in
          </RouterLink>
        </div>

        
        <div class="navbar-item">
          <RouterLink class="button is-primary" to="/register">
            <strong>Sign up</strong>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid red;
}
</style>
