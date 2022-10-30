<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import type { Reading } from '@/types/Reading'
import { useReadingStore } from '@/composables/useReadingStore'
import { formatNumber } from '@/utils'
import {
  IonToolbar,
  IonTitle,
  IonPage,
  IonHeader,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  useIonRouter,
  toastController,
  onIonViewWillEnter,
} from '@ionic/vue'
import { arrowBack, pencil, trash, informationCircle } from 'ionicons/icons'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)

const router = useIonRouter()
const route = useRoute()
const { fetchReading, deleteReading } = useReadingStore()

const key = route.params.key.toString()
const reading = ref<Reading | null>(null)

onIonViewWillEnter(async () => {
  reading.value = await fetchReading(key)
})

const formattedDate = computed(() => {
  return dayjs(reading.value?.dt).format('LLL')
})

const remove = async () => {
  const v = unref(reading)

  if (v) {
    await deleteReading(v)

    const toast = await toastController.create({
      icon: informationCircle,
      message: 'Reading deleted!',
      position: 'top',
      color: 'warning',
      duration: 1000,
      animated: true,
    })
    await toast.present()

    setTimeout(() => router.back(), 300)
  }
}

const edit = () => {
  router.push(`/readings/${key}/edit`)
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Readings</ion-title>
        <ion-buttons slot="start">
          <ion-button direction="back" @click.prevent="$router.back()">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="edit()">
            <ion-icon :icon="pencil"></ion-icon>
          </ion-button>
          <ion-button @click="remove()">
            <ion-icon :icon="trash"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list lines="full">
        <ion-item>
          <ion-label>Date:</ion-label>
          <ion-label slot="end">{{ formattedDate }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Reading:</ion-label>
          <ion-label slot="end">{{ reading?.val }}kWh</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Amount:</ion-label>
          <ion-label slot="end">
            {{ formatNumber(reading?.amount ?? 0) }}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Rate/kWh:</ion-label>
          <ion-label slot="end">
            {{ formatNumber(reading?.rate ?? 0) }}/kWh
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
