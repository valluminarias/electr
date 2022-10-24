<script setup lang="ts">
import { App } from '@capacitor/app';
import { ref } from 'vue';
import {
  IonApp,
  IonRouterOutlet,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/vue';

const beforeTabChange = () => {
  // do something before tab change
}
const afterTabChange = () => {
  // do something after tab change
}

const isMobile = ref(false);

App.getInfo()
  .then((info) => {
    isMobile.value = true;
  })
  .catch((err) => {
    isMobile.value = false;
    console.log('Not running on mobile.');
  })
</script>

<template>
  <ion-app>
    <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="schedule" href="/">
          <ion-label>Home</ion-label>
          <ion-badge>6</ion-badge>
        </ion-tab-button>

        <ion-tab-button tab="speakers" href="#">
          <ion-label>List</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
      <ion-router-outlet />
    </ion-tabs>
  </ion-app>
</template>
