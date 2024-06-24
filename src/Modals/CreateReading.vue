<script lang="ts" setup>
import { unref, onMounted } from 'vue'
import { formatCurrency } from '@/utils'
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
} from '@ionic/vue'
import { checkmark, close } from 'ionicons/icons'
import { useReadingForm } from '@/composables/useReadingForm'
import type { Reading } from '@/types/Reading'

const { reading, dt_from, dt_to, dt_due, computedRate } = useReadingForm()

const emit = defineEmits<{
  (e: 'submit', value: Reading): void,
  (e: 'cancel'): void,
}>()
const cancel = () => {
  emit('cancel')
}

const submit = async () => {
  emit('submit', unref(reading))
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
        <ion-label>Period From:</ion-label>
        <ion-input
          type="date"
          class="text-end"
          placeholder="Choose Date"
          v-model="dt_from"
          slot="end"
          :clear-input="true"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>Period To:</ion-label>
        <ion-input
          type="date"
          class="text-end"
          placeholder="Choose Date"
          v-model="dt_to"
          slot="end"
          :clear-input="true"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>Due Date:</ion-label>
        <ion-input
          type="date"
          class="text-end"
          placeholder="Choose Date"
          v-model="dt_due"
          slot="end"
          :clear-input="true"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>Previous Reading:</ion-label>
        <ion-input
          type="number"
          class="text-end"
          placeholder="Enter Reading in KWh"
          :clear-input="true"
          v-model="reading.previous"
          @click="$event.target.select()"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>Current Reading:</ion-label>
        <ion-input
          type="number"
          class="text-end"
          placeholder="Enter Reading in KWh"
          :clear-input="true"
          v-model="reading.current"
          @click="$event.target.select()"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>Reading(KWh):</ion-label>
        <ion-label class="text-end">
          {{ reading.val }}/kWh
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Amount:</ion-label>
        <ion-input
          type="number"
          class="text-end"
          placeholder="Enter Reading Amount"
          :clear-input="true"
          v-model="reading.amount"
          @click="$event.target.select()"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Rate(/KWh):</ion-label>
        <ion-label class="text-end">
          {{ formatCurrency(computedRate) }}/kWh
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>
