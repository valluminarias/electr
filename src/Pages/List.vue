<script lang="ts" setup>
import { computed } from 'vue'
import { useReadingStore } from '@/composables/useReadingStore'
import type { Reading } from '@/types/Reading'
import { formatDate, formatNumber } from '@/utils'
import {
  IonToolbar,
  IonTitle,
  IonLabel,
  IonText,
  IonPage,
  IonHeader,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonMenuButton,
  useIonRouter,
  onIonViewWillEnter,
} from '@ionic/vue'
import { arrowBack, colorWand } from 'ionicons/icons'

const router = useIonRouter()
const { fetchReadings, orderedReadings } = useReadingStore()

onIonViewWillEnter(async () => await fetchReadings())

const readings = computed(() => {
  const r = [...orderedReadings.value]
  return r.reverse()
});

const openDetails = async (reading: Reading) => {
  const key = reading._id

  router.push(`/readings/${key}`)
}
</script>

<template>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Readings</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
          <ion-button direction="back" @click.prevent="$router.back()">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list lines="full">
        <ion-item
          :detail="true"
          v-for="(read, k) in readings"
          :key="k"
          button
          @click="openDetails(read)"
        >
          <ion-label>{{ formatDate(read.dt) }}</ion-label>
          <ion-label slot="end">{{ formatNumber(read.amount) }}</ion-label>
        </ion-item>
      </ion-list>

      <div
        v-if="orderedReadings.length == 0"
        class="ion-text-center ion-margin ion-padding"
      >
        <ion-icon color="medium" size="large" :icon="colorWand"></ion-icon>
        <ion-text color="medium">
          <h5>No Data Yet. Create a record first!</h5>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>
