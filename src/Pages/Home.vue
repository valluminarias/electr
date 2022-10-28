<script lang="ts" setup>
import dayjs from 'dayjs'
import { reactive, computed } from 'vue'
import type { Reading } from '@/types/Reading'
import { useReadingStore } from '@/composables/useReadingStore'
import CreateReading from '@/Modals/CreateReading.vue'
import {formatDate, formatNumber} from "@/utils";
import {
  IonToolbar,
  IonTitle,
  IonPage,
  IonHeader,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonFab,
  IonFabButton,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonListHeader,
  IonItemGroup,
  IonItemDivider,
  IonItem,
  IonText,
  toastController,
  modalController,
} from '@ionic/vue'
import { personCircle, search, addOutline, colorWand } from 'ionicons/icons'

const store = reactive(useReadingStore())

const openCreate = async () => {
  const modal = await modalController.create({
    component: CreateReading,
  })

  modal.present()
  const { data, role } = await modal.onWillDismiss()

  if (role == 'submit') {
    await store.createReading(data)

    const toast = await toastController.create({
      message: 'New Reading Saved!',
      position: 'top',
      color: 'success',
      duration: 1000,
      animated: true,
    })
    await toast.present()
  }
}

const thisMonthReading = computed<Reading | null>(() => {
  return store.readings.filter(r => {
    const thisMonth = dayjs().month;
    return dayjs(r.dt).month === thisMonth;
  })[0] ?? null;
});

</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="search"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Welcome</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>This Month Reading</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid v-if="thisMonthReading">
            <ion-row>
              <ion-col>
                <ion-label>{{ thisMonthReading.val }} kWh</ion-label>
              </ion-col>
              <ion-col>
                <ion-label>{{ formatNumber(thisMonthReading.amount) }}</ion-label>
              </ion-col>
            </ion-row>
          </ion-grid>
          <template v-else>
            No readings recorded for this month yet.
          </template>
        </ion-card-content>
      </ion-card>

      <div style="margin-top: 1rem;">
        <ion-list>
          <ion-list-header>
            <ion-label>Reading List</ion-label>
          </ion-list-header>
          <ion-item-group v-for="read in store.orderedReadings">
            <ion-item-divider>
              <ion-label>{{ formatDate(read.dt) }}</ion-label>
            </ion-item-divider>
            <ion-item>
              <ion-grid>
                <ion-row>
                  <ion-col size-md="6">
                    <ion-label>Reading: {{ read.val }} kWh</ion-label>
                  </ion-col>
                  <ion-col size-md="6">
                    <ion-label>
                      Amount: {{ formatNumber(read.amount) }}
                    </ion-label>
                  </ion-col>
                  <ion-col size-md="6">
                    <ion-label>Rate: {{ formatNumber(read.rate) }}</ion-label>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
          </ion-item-group>
        </ion-list>
        <div v-if="store.orderedReadings.length == 0" class="ion-text-center ion-margin ion-padding">
            <ion-icon color="medium" size="large" :icon="colorWand"></ion-icon>
            <ion-text color="medium">
              <h5>No Data Yet. Create a record first!</h5>
            </ion-text>
        </div>
      </div>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openCreate">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>