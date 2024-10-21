<script setup lang="ts"></script>

<template>
  <div class="hero is-link">
    <div class="hero-body">
      <p class="title">My Friends</p>
    </div>
  </div>

  <section class="section">
    <div class="columns">
      <div class="column is-two-fifths">
        <aside class="menu">
          <p class="menu-label">Friends</p>
          <ul class="menu-list">
            <li><a>Friend Name</a></li>
          </ul>
        </aside>
      </div>
      <div class="column is-three-fifths">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/assets/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    src="https://bulma.io/assets/images/placeholders/96x96.png"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">John Smith</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>
            <div class="content">
              My Biography
            </div>
            <header class="card-header">
              <p class="card-header-title">Workouts</p>
              <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </header>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
