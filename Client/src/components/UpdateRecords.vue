<script setup lang="ts">
import type { Stats } from '@/model/user';
import { ref, watch } from 'vue'

const props = defineProps<{ stats: Stats }>()
const stat = ref<Stats>(props.stats)

// Watch for changes to the user prop and update the local user reference
watch(
  () => props.stats,
  newStat => {
    stat.value = newStat
  },
)
</script>

<template>
  <div>
    <section class="section">
      <div class="box">
        <div class="field">
          <label class="label">DeadLift</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="DeadLift"
              v-model="stat.deadlift"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Bench Press</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Bench Press"
              v-model="stat.bench"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Squat</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Squat"
              v-model="stat.squat"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
