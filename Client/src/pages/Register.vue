<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { create, emptyStats, type User } from '@/model/user'
import PersonalInfo from '@/components/PersonalInfo.vue'

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
  stats: emptyStats(),
  admin: false,
})

const errorMessage = ref('')
const router = useRouter()

async function handleCreateAccount() {
  try {
    const newUser = await create(user.value)
    console.log('User created:', newUser)
    // Redirect to a different page after successful account creation
    router.push('/')
  } catch (error) {
    console.error('Create account error:', error)
    errorMessage.value = 'Failed to create account. Please try again.'
  }
}
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
      <button class="button is-link" @click="handleCreateAccount">Create Account</button>
    </div>
    <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>
  </div>
</template>

<style scoped></style>
