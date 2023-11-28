<template>
  <v-app>
      <div>
        <Navbar />
      </div>
      <div>
          <RouterView />
      </div>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue'
import { onMounted, ref } from "vue";

const buildVersion = ref('Version 1.0')
const buildDate = ref('Nov 25, 2023')

onMounted(() => {
})

</script>

<style scoped>
</style>
