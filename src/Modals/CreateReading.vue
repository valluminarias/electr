<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import type { Reading } from "@/types/Reading";
import { useReadingStore } from "@/composables/useReadingStore";
import dayjs from 'dayjs'
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonLabel,
  IonContent,
  IonIcon,
  IonList,
  IonListHeader,
  IonItem,
  IonInput,
  modalController,
} from '@ionic/vue'
import { checkmark, close } from 'ionicons/icons'

const {createReading} = useReadingStore();

const reading = reactive<Reading>({
  dt: dayjs().valueOf(),
  val: 0,
  amount: 0,
  rate: 0,
})
const dt = ref(dayjs().format('YYYY-MM-DD'))

const computedRate = computed(() => {
  return Number(Number(reading.rate).toFixed(2)) * 1
})

watch(dt, (v) => {
  reading.dt = dayjs(v).valueOf()
})

watch(() => reading.val, (v) => {
  if (v > 0 && reading.amount > 0) {
    reading.rate = reading.amount / reading.val;
  }
})

watch(() => reading.amount, (v) => {
  if (v > 0 && reading.val > 0) {
    reading.rate = v / reading.val;
  }
})

const cancel = () => {
  return modalController.dismiss(null, 'cancel')
}

const submit = async () => {
  await createReading(reading);

  return modalController.dismiss(reading, 'submit')
}
</script>

<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-button @click="cancel">
          <ion-icon :icon="close"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Add Reading</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="submit">
          <ion-icon :icon="checkmark"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-list-header>
        <ion-label>Details</ion-label>
      </ion-list-header>

      <ion-item>
        <ion-label>Date:</ion-label>
        <ion-input
          type="date"
          class="ion-text-end"
          placeholder="Choose Date"
          v-model="dt"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Reading(KWh):</ion-label>
        <ion-input
          type="number"
          class="ion-text-end"
          placeholder="Enter Reading in KWh"
          v-model="reading.val"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Amount:</ion-label>
        <ion-input
          type="number"
          class="ion-text-end"
          placeholder="Enter Reading in KWh"
          v-model="reading.amount"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Rate(per KWh):</ion-label>
        <ion-input
          type="number"
          :disabled="true"
          class="ion-text-end"
          placeholder="Rate/KWh"
          :value="computedRate"
        ></ion-input>
      </ion-item>
    </ion-list>
  </ion-content>
</template>
