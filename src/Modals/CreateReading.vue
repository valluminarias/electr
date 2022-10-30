<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import type { Reading } from '@/types/Reading'
import dayjs from 'dayjs'
import { formatNumber } from '@/utils'
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
import { useReadingForm } from '@/composables/useReadingForm'

const { reading, dt, computedRate } = useReadingForm()

const cancel = () => {
  return modalController.dismiss(null, 'cancel')
}

const submit = async () => {
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
    <ion-list lines="full">
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
          slot="end"
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
        <ion-label>Rate(/KWh):</ion-label>
        <ion-label class="ion-text-end">
          {{ formatNumber(computedRate) }}/kWh
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>
