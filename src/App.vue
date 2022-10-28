<script setup lang="ts">
import { isPlatform, getPlatforms } from '@ionic/vue'
import { ref } from 'vue'
import { IonApp, IonRouterOutlet } from '@ionic/vue'

const isMobile = ref(isPlatform('mobile'))

console.log(getPlatforms());
</script>

<template>
  <ion-app v-if="isMobile">
    <ion-router-outlet />
  </ion-app>
  <template v-else>
    This platform is not supported yet.
  </template>
</template>
