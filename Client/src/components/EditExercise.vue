<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Exercise } from '@/model/exercises'

const props = defineProps<{ exercise: Exercise }>()
const exercise = ref<Exercise>(props.exercise)

// Watch for changes to the user prop and update the local user reference
watch(() => props.exercise, (ex) => {
    exercise.value = ex
})

function addPrimaryMuscle() {
  exercise.value.primaryMuscles.push('')
}

function removePrimaryMuscle(index: number) {
  exercise.value.primaryMuscles.splice(index, 1)
}

function addInstruction() {
  exercise.value.instructions.push('')
}

function removeInstruction(index: number) {
  exercise.value.instructions.splice(index, 1)
}
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="box">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Exercise Name" v-model="exercise.name" />
            </div>
          </div>
          <div class="field">
            <label class="label">Equipment</label>
            <div class="control">
              <input class="input" type="text" placeholder="Exercise Equipment" v-model="exercise.equipment" />
            </div>
          </div>
          <div class="field">
            <label class="label">Category</label>
            <div class="control">
              <input class="input" type="text" placeholder="Category" v-model="exercise.category" />
            </div>
          </div>
          <div class="field">
            <label class="label">Primary Muscles</label>
            <div class="control">
              <div v-for="(muscle, index) in exercise.primaryMuscles" :key="index" class="field has-addons">
                <input class="input" type="text" v-model="exercise.primaryMuscles[index]" />
                <button class="button is-danger" @click="removePrimaryMuscle(index)">Remove</button>
              </div>
              <button class="button is-primary" @click="addPrimaryMuscle">Add Muscle</button>
            </div>
          </div>
          <div class="field">
            <label class="label">Instructions</label>
            <div class="control">
              <div v-for="(instruction, index) in exercise.instructions" :key="index" class="field has-addons">
                <input class="input" type="text" v-model="exercise.instructions[index]" />
                <button class="button is-danger" @click="removeInstruction(index)">Remove</button>
              </div>
              <button class="button is-primary" @click="addInstruction">Add Instruction</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
