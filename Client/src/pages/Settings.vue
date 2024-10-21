<script setup lang="ts"></script>

<template>
  <div>
    <section class="hero is-link">
      <div class="hero-body">
        <p class="title">Account</p>
      </div>
    </section>
    <sectiom class="section">
      <div class="box">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="First Name" />
          </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Last Name" />
          </div>
        </div>
        <div class="field" >
          <label class="label" for="date" >
            Date of Birth
          </label>
          <input type="date" class="input"/>
        </div>
      </div>

      <div class="box">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="text" placeholder="Email" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="text" placeholder="Password" />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="field">
          <label class="label">Biography</label>
          <div class="control">
            <input class="input" type="text" placeholder="Bio" />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="field">
          <label class="label">UserPhoto</label>
          <div class="control">
            <input class="input" type="text" placeholder=".JPG or PNG" />
          </div>
        </div>
      </div>
    </sectiom>
  </div>
</template>

<style scoped></style>
