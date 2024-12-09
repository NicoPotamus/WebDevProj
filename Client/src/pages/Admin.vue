<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { getAll, remove, update, create, type User, emptyStats } from '@/model/user'
import { onMounted, ref, computed } from 'vue'
import PersonalInfo from '@/components/PersonalInfo.vue'
import { refUser } from '@/model/sesssion'
import {
  type Exercise,
  getAll as getAllExercises,
  remove as removeEx,
  create as createEx,
  update as updateExercise,
} from '@/model/exercises'
import EditExercise from '@/components/EditExercise.vue'

const editUser = refUser()
const editModal = ref<boolean>(false)

const errorMessage = ref('')

const userList = ref<User[]>([]) // Initialize as an empty array

async function saveChanges() {
  editModal.value = false
  if (editUser.value) {
    try {
      if (editUser.value.id === 0) {
        // Create new exercise
        const response = await create(editUser.value)
        if (response.isSuccess) {
          userList.value.push(response.data)
        } else {
          console.error('Failed to create exercise:', response.error)
        }
      } else {
        // Update existing exercise
        const response = await update(editUser.value)
        if (response.isSuccess) {
          const index = userList.value.findIndex(
            u => u.id === editUser.value?.id,
          )
          if (index !== -1) {
            userList.value[index] = response.data
          }
        } else {
          console.error('Failed to update exercise:', response.error)
        }
      }
    } catch (error) {
      console.error('Error saving exercise:', error)
    }
  }
}

function fEditUser(user: User) {
  editUser.value = user
  editModal.value = true
}

async function removeUser(user: User) {
  await remove(user.id ?? 0)
  userList.value = userList.value.filter(u => u.id !== user.id)
}

//----------------------- Exercise time
const exerciseList = ref<Exercise[]>([]) // Initialize as an empty array

const currentPage = ref(1)
const itemsPerPage = ref(10)

const paginatedExercises = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return exerciseList.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(exerciseList.value.length / itemsPerPage.value)
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

async function loadExercises() {
  try {
    const response = await getAllExercises()
    if (response.isSuccess) {
      exerciseList.value = response.data
      console.log('exerciseList:', exerciseList.value)
    } else {
      console.error('Failed to load exercises:', response.error)
    }
  } catch (error) {
    console.error('Error loading exercises:', error)
  }
}
const editEx = ref<Exercise | null>({
  id: 0,
  name: '',
  equipment: '',
  category: '',
  primaryMuscles: [],
  instructions: [],
})
const editExModal = ref<boolean>(false)

function fEditExercise(ex: Exercise) {
  editEx.value = ex
  editExModal.value = true
}

async function saveExercise() {
  editExModal.value = false
  if (editEx.value) {
    try {
      if (editEx.value.id === 0) {
        // Create new exercise
        const response = await createEx(editEx.value)
        if (response.isSuccess) {
          exerciseList.value.push(response.data)
        } else {
          console.error('Failed to create exercise:', response.error)
        }
      } else {
        // Update existing exercise
        const response = await updateExercise(editEx.value)
        if (response.isSuccess) {
          const index = exerciseList.value.findIndex(
            e => e.id === editEx.value?.id,
          )
          if (index !== -1) {
            exerciseList.value[index] = response.data
          }
        } else {
          console.error('Failed to update exercise:', response.error)
        }
      }
    } catch (error) {
      console.error('Error saving exercise:', error)
    }
  }
}

async function removeExercise(ex: Exercise) {
  try {
    await removeEx(ex.id)
    exerciseList.value = exerciseList.value.filter(e => e.id !== ex.id)
  } catch (error) {
    console.error('Error removing exercise:', error)
  }
}

onMounted(async () => {
  try {
    const response = await getAll()
    if (response.isSuccess) {
      userList.value = response.data
      console.log('userList:', userList.value)
    } else {
      console.error('Failed to load users:', response.error)
    }
  } catch (error) {
    console.error('Error loading users:', error)
  }
  loadExercises()
})
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
            <tr>
              <td colspan="9">
                <button
                  class="button is-primary"
                  @click="
                    fEditUser({
                      id: 0,
                      dob: new Date(),
                      email: '',
                      username: '',
                      firstName: '',
                      lastName: '',
                      password: '',
                      photo: '',
                      following: [],
                      stats: emptyStats(),
                      admin: false,
                    })
                  "
                >
                  Add User
                </button>
              </td>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="user in userList" :key="user.id">
              <th>{{ user.id }}</th>
              <td>{{ user.username }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.dob }}</td>
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
                    <button class="delete" @click="removeUser(user)"></button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box table-container">
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Equipment</th>
              <th>Category</th>
              <th>Primary Muscles</th>
              <th>Instructions</th>
              <th>
                <button
                  class="button is-primary"
                  @click="
                    fEditExercise({
                      id: 0,
                      name: '',
                      equipment: '',
                      category: '',
                      primaryMuscles: [],
                      instructions: [],
                    })
                  "
                >
                  Add Exercise
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exercise in paginatedExercises" :key="exercise.id">
              <td>{{ exercise.id }}</td>
              <td>{{ exercise.name }}</td>
              <td>{{ exercise.equipment }}</td>
              <td>{{ exercise.category }}</td>
              <td>{{ exercise.primaryMuscles.join(', ') }}</td>
              <td>{{ exercise.instructions.join(' ') }}</td>
              <td>
                <div class="columns">
                  <div class="column is-half">
                    <button
                      class="button is-light"
                      @click="fEditExercise(exercise)"
                    >
                      <i class="fa-solid fa-pencil"></i>
                    </button>
                  </div>
                  <div class="column is-half">
                    <button
                      class="delete"
                      @click="removeExercise(exercise)"
                    ></button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="7">
                <nav
                  class="pagination is-centered"
                  role="navigation"
                  aria-label="pagination"
                >
                  <button
                    class="pagination-previous"
                    @click="prevPage"
                    :disabled="currentPage === 1"
                  >
                    Previous
                  </button>
                  <button
                    class="pagination-next"
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                  >
                    Next
                  </button>
                  <ul class="pagination-list">
                    <li v-for="page in totalPages" :key="page">
                      <button
                        class="pagination-link"
                        @click="currentPage = page"
                        :class="{ 'is-current': currentPage === page }"
                      >
                        {{ page }}
                      </button>
                    </li>
                  </ul>
                </nav>
              </td>
            </tr>
          </tfoot>
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
          <PersonalInfo :user="editUser!" />

          <button
            class="modal-close is-large"
            aria-label="close"
            @click="editModal = !editModal"
          ></button>
          <button class="button is-success" @click="saveChanges()">Save</button>
        </section>
      </div>
    </div>
    <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>
  </div>
  <div class="modal" :class="{ 'is-active': editExModal }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Exercise</p>
        </header>
        <section class="modal-card-body">
          <EditExercise v-if="editEx" :exercise="editEx" />
          <button
            class="modal-close is-large"
            aria-label="close"
            @click="editExModal = false"
          ></button>
          <button class="button is-success" @click="saveExercise">Save</button>
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
