<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import PersonalInfo from '@/components/PersonalInfo.vue'
import { emptyStats, type User } from '@/model/user'
import { ref } from 'vue'

const user = ref<User>({
  firstName: 'Nico',
  lastName: 'DeMilio',
  dob: new Date(1999, 9, 19, 0, 0, 0, 0),
  email: 'NicoDeMilio@email.com',
  password: 'password',
  biography: 'I am a student at SUNY new paltz',
  photo: 'some.jpg',
  workouts: [
    {
      name: 'ChoO cHOo cAlOo',
      sets: 4,
      exercises: [
        {
          exercise: {
            name: '90/90 Hamstring',
            equipment: 'body only',
            primaryMuscles: ['hamstrings'],
            instructions: [
              'Lie on your back, with one leg extended straight out.',
              'With the other leg, bend the hip and knee to 90 degrees. You may brace your leg with your hands if necessary. This will be your starting position.',
              'Extend your leg straight into the air, pausing briefly at the top. Return the leg to the starting position.',
              'Repeat for 10-20 repetitions, and then switch to the other leg.',
            ],
            category: 'stretching',
          },
          reps: 15,
        },
      ],
    },
  ],
  following: [],
  username: 'NicoD',
  id: 0,
  stats: emptyStats,
  admin: false,
})
</script>

<template>
  <div>
    <section class="hero is-link">
      <div class="hero-body">
        <p class="title">Account</p>
      </div>
    </section>
    <PersonalInfo :user="user" />
  </div>
</template>

<style scoped></style>
