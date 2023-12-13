<template>
  <div class="row jutify-center text-center" style="padding-top: 25vh;">
    <div class="col-12 q-px-md">
      <div class="text-h1 q-pb-lg">404</div>
      <p class="text-subtitle">We can't seem to find the page you're looking for.</p>
      <div class="q-gutter-md">
        <q-btn
          no-caps
          unelevated
          color="primary"
          label="Go Home"
          class="q-px-md"
          @click="goHome"
          text-color="dark"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound',
  methods: {
    goHome () {
      return window.location.replace('/')
    }
  }
})
</script>
