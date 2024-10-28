<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
  <div>
    <section class="hero is-link">
      <div class="hero-body">
        <p class="title">Sign In</p>
      </div>
    </section>
    <div class="box">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="Email" />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="Password" />
        </div>
      </div>
      <div class="buttons">
        <div class="button">Sign In</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
