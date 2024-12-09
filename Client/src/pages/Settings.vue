<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import PersonalInfo from '@/components/PersonalInfo.vue'
import { refUser } from '@/model/sesssion';
import { update } from '@/model/user';
import router from '@/router';
import { ref } from 'vue';

const errorMessage = ref('')
const user = refUser()
async function updateAccount() {
  try {
    if (user.value) {
      const newUser = await update(user.value)
      console.log('User created:', newUser)
      // Redirect to a different page after successful account creation
      router.push('/')
    } else {
      console.error('User is null')
    }
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
        <p class="title">Account</p>
      </div>
    </section>
    <PersonalInfo :user="user!" />
    <div class="buttons">
      <button class="button is-link" @click="updateAccount()">update Account</button>
    </div>
    <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>
  </div>
</template>

<style scoped></style>
