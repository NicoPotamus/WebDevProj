<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { userNico, type User } from '@/model/user'
import { ref } from 'vue'
import NicoPhoto from '../assets/NicoPhoto.jpg'
import JohnPhoto from '../assets/JohnPhoto.jpg'
import PersonalInfo from '@/components/PersonalInfo.vue'

const editUser = ref<User>(userNico)
const editModal = ref<boolean>(false)

const userList = ref()  //toDo: pull all users from server

function saveChanges() {
  editModal.value = false
}

function fEditUser(user: User) {
  editUser.value = user
  editModal.value = true
}
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
                    <button class="button is-light" @click="fEditUser(user)">
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

  <div class="modal" :class="{ 'is-active': editModal }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit UserStats</p>
        </header>
        <section class="modal-card-body">
          <PersonalInfo :user="editUser" />

          <button
            class="modal-close is-large"
            aria-label="close"
            @click="editModal = !editModal"
          ></button>
          <button class="button is-success" @click="saveChanges()">Save</button>
        </section>
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
