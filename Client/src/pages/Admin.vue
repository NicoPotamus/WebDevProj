<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { emptyStats, type User } from '@/model/user'
import { ref } from 'vue'
import NicoPhoto from '../assets/NicoPhoto.jpg'
import JohnPhoto from '../assets/JohnPhoto.jpg'

const userList = ref<User[]>([
  {
    firstName: 'Nico',
    lastName: 'DeMilio',
    dob: new Date('1999-09-19'),
    email: 'NicoDeMilio@email.com',
    password: 'password',
    biography: 'I am a student at SUNY new paltz',
    photo: NicoPhoto,
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
    id: 1,
    stats: emptyStats,
    admin: false,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date('1999-09-19'),
    email: 'coolBeans@email.com',
    password: 'password',
    biography: 'I am a student at SUNY new paltz',
    photo: JohnPhoto,
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
    username: 'JohnD',
    id: 2,
    stats: emptyStats,
    admin: false,
  },
])
</script>

<template>
  <section class="hero is-link">
    <div class="hero-body">
      <p class="title">Admin</p>
    </div>
  </section>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <div class="box table-container">
        <table class="table">
          <thead>
            <tr>
              <th><abbr title="Position">Pos</abbr></th>
              <th><abbr title="Username">User</abbr></th>
              <th><abbr title="First Name">FName</abbr></th>
              <th><abbr title="Last Name">LName</abbr></th>
              <th><abbr title="Date of Birth">DOB</abbr></th>
              <th><abbr title="Email">Email</abbr></th>
              <th><abbr title="Password">psw</abbr></th>
              <th><abbr title="Following">Fllw</abbr></th>
            </tr>
          </thead>
          <tfoot>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th><button class="button is-primary">Add User</button></th>
          </tfoot>
          <tbody v-for="user in userList" :key="user.id">
            <tr>
              <th>{{ user.id }}</th>
              <td>{{ user.username }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.dob.toDateString().substring(0, 16) }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.password }}</td>
              <td>{{ user.following?.length }}</td>
              <td>
                <div class="columns">
                  <div class="column is-half">
                    <button class="button is-light">
                      <i class="fa-solid fa-pencil"></i>
                    </button>
                  </div>
                  <div class="column is-half">
                    <button class="delete"></button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
}
</style>
