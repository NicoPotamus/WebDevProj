<script setup lang="ts">
import type { User } from '@/model/user'
import { ref } from 'vue'

const props = defineProps<{ user: User }>()
// eslint-disable-next-line vue/no-dupe-keys
const user = ref<User>(props.user)

// eslint-disable-next-line vue/no-dupe-keys

</script>

<template>
  <div>
    <sectiom class="section">
      <div class="box">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="First Name"
              v-model="user.firstName"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Last Name"
              v-model="user.lastName"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="date"> Date of Birth </label>
          <input type="date" class="input" v-model="user.dob" />
        </div>
      </div>

      <div class="box">
        <div class="field">
          <label class="label">UserName</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Username"
              v-model="user.username"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Email"
              v-model="user.email"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Password"
              v-model="user.password"
            />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="field">
          <label class="label">Biography</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Bio"
              v-model="user.biography"
            />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="field">
          <label class="label">UserPhoto</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder=".JPG or PNG"
              v-model="user.photo"
            />
          </div>
        </div>
      </div>
    </sectiom>
  </div>
</template>

<style scoped></style>
