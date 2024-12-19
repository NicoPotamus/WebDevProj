<script setup lang="ts">
import type { User } from '@/model/user'
import { ref, watch } from 'vue'

const props = defineProps<{ user: User }>()
const user = ref<User>(props.user)

// Watch for changes to the user prop and update the local user reference
watch(() => props.user, (newUser) => {
  user.value = newUser
})

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const maxWidth = 300
        const maxHeight = 300
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height
        ctx?.drawImage(img, 0, 0, width, height)
        user.value.photo = canvas.toDataURL('image/jpeg')
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div>
    <section class="section">
      <div class="box">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="First Name" v-model="user.firstName" />
          </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Last Name" v-model="user.lastName" />
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
            <input class="input" type="text" placeholder="Username" v-model="user.username" />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="text" placeholder="Email" v-model="user.email" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="text" placeholder="Password" v-model="user.password" />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="field">
          <label class="label">Biography</label>
          <div class="control">
            <input class="input" type="text" placeholder="Bio" v-model="user.biography" />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="field">
          <label class="label">User Photo</label>
          <div class="control">
            <input class="input" type="file" @change="handleFileUpload" />
          </div>
          <div v-if="user.photo">
            <img :src="user.photo" alt="User Photo" style="max-width: 100%; height: auto;" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
