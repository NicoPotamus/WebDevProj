<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import PersonalInfo from '@/components/PersonalInfo.vue'
import { refUser } from '@/model/sesssion';

const user = refUser()

</script>

<template>
  <div>
    <section class="hero is-link">
      <div class="hero-body">
        <p class="title">Account</p>
      </div>
    </section>
    <PersonalInfo :user="user!" />
  </div>
</template>

<style scoped></style>
