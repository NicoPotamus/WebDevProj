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
      login(email.value, password.value).then((user) => {
      signIn(user.data)
      console.log('User logged in:', user.data)
      // Redirect to a different page after successful login
      router.push('/')
      console.log('User logged in: and rerouted')
    })
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Invalid email or password'
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
