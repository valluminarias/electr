<script setup lang="ts">
import { App } from '@capacitor/app'
import { ref } from 'vue'
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/vue'

const isMobile = ref(false)

App.getInfo()
  .then((info) => {
    isMobile.value = true
  })
  .catch((err) => {
    isMobile.value = false
    console.log('Not running on mobile.')
  })
</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>
