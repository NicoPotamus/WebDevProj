<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/model/user'
import { useRouter } from 'vue-router'
import { signIn } from '@/model/sesssion';

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

async function handleLogin() {
  try {
    const response = await login(email.value, password.value)
    if (response.isSuccess) {
      signIn(response.user, response.token)
      console.log('User logged in:', response.user)
      // Redirect to a different page after successful login
      router.push('/')
      console.log('User logged in: and rerouted')
    } else {
      errorMessage.value = response.msg || 'Invalid email or password'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'An error occurred during login. Please try again.'
  }
}
</script>

<template>
  <div>
    <section class="hero is-link">
      <div class="hero-body">
        <p class="title">Sign In</p>
      </div>
    </section>
    <div class="box">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="Email" v-model="email" />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="Password" v-model="password" />
        </div>
      </div>
      <div class="buttons">
        <button class="button is-link" @click="handleLogin">Sign In</button>
      </div>
      <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped></style>
