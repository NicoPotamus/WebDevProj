<script setup lang="ts">
import { refUser, signIn } from '@/model/sesssion';
import type { User } from '@/model/user'
import { userNico } from '@/model/user'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
const user = refUser()
const possibleUsers = ref<User[]>([userNico])

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
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Log in </a>

          <div
            class="navbar-dropdown"
            v-for="userP in possibleUsers"
            :key="userP.id"
          >
            <a class="navbar-item" @click="signIn(userP)">
              {{ userP.firstName }} {{ userP.lastName }}
            </a>
            <hr class="navbar-divider" />
            <RouterLink class="button is-light" to="/signin">
              Log in
            </RouterLink>
          </div>
        </div>

        <div v-if="user" class="navbar-item">
          <button class="button is-danger" @click="signIn(null)">
            <strong>Log Out</strong>
          </button>
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
