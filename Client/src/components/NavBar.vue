<script setup lang="ts">

import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <RouterLink class="navbar-item" to="/"/>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" :class="{ 'is-active': isOpen }" @click="isOpen = !isOpen">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" :class="{'is-active' : isOpen}">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/">
                    Home
                </RouterLink>
                <RouterLink class="navbar-item" to="/workouts">
                    Workouts
                </RouterLink>
                <RouterLink class="navbar-item" to="/friends">
                    Friends
                </RouterLink>

                <div class="navbar-item has-dropdown is-hoverable">
                    <RouterLink class="navbar-item" to="/settings">
                        Settings
                    </RouterLink>

                    <div class="navbar-dropdown">
                    <a class="navbar-item">
                        Personal info
                    </a>
                    <a class="navbar-item is-selected">
                        Jobs
                    </a>
                    <a class="navbar-item">
                        Contact
                    </a>
                    <hr class="navbar-divider">
                    <a class="navbar-item">
                        Report an issue
                    </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                <a class="button is-primary">
                    <strong>Sign up</strong>
                </a>
                <a class="button is-light">
                    Log in
                </a>
                </div>
            </div>
            </div>
        </div>
    </nav>

</template>

<style scoped>
    .router-link-active {
        font-weight:bold;
        border-bottom: 2px solid red;
    }
</style>