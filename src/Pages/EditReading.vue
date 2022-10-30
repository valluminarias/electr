<script lang="ts" setup>
import { computed, onMounted, reactive, ref, unref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import type { Reading } from '@/types/Reading'
import { useReadingStore } from '@/composables/useReadingStore'
import { formatDate, formatNumber } from '@/utils'
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
  IonInput,
  useIonRouter,
  toastController,
onIonViewWillEnter,
} from '@ionic/vue'
import { close, checkmark, informationCircle } from 'ionicons/icons'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { useReadingForm } from '@/composables/useReadingForm'

dayjs.extend(LocalizedFormat)

const router = useIonRouter()
const route = useRoute()
const { fetchReading, updateReading } = useReadingStore()

const key = route.params.key.toString()
const {reading, dt,computedRate, setReading } = useReadingForm();

async function fetch() {
    const res = await fetchReading(key)
    if (res) {
        setReading(res)
    }
}

onIonViewWillEnter(async () => {
    await fetch();
})

const cancel = () => {
  router.back()
}

const submitEdit = async () => {
    const key = reading.value.dt.toString();
    await updateReading(key, unref(reading));

    const toast = await toastController.create({
      icon: informationCircle,
      message: 'Reading updated!',
      position: 'top',
      color: 'success',
      duration: 1000,
      animated: true,
    })
    await toast.present()

    setTimeout(() => router.back(), 300)
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Reading - {{ formatDate(reading?.dt ?? 0) }}</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="cancel">
            <ion-icon :icon="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="submitEdit">
            <ion-icon :icon="checkmark"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list lines="full">
        <ion-item>
          <ion-label>Date:</ion-label>
          <ion-input
            type="date"
            class="ion-text-end"
            placeholder="Choose Date"
            slot="end"
            v-model="dt"
            :clear-input="true"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Reading(KWh):</ion-label>
          <ion-input
            type="number"
            class="ion-text-end"
            placeholder="Enter Reading in KWh"
            :clear-input="true"
            v-model="reading.val"
            @click="$event.target.select()"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Amount:</ion-label>
          <ion-input
            type="number"
            class="ion-text-end"
            placeholder="Enter Reading in KWh"
            :clear-input="true"
            v-model="reading.amount"
            @click="$event.target.select()"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Rate/kWh:</ion-label>
          <ion-label>Rate(/KWh):</ion-label>
          <ion-label class="ion-text-end">
            {{ formatNumber(computedRate) }}/kWh
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
