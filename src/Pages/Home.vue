<script lang="ts" setup>
import dayjs from "dayjs";
import { reactive } from "vue";
import { useReadingStore } from "@/composables/useReadingStore";
import CreateReading from '@/Modals/CreateReading.vue'
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
  toastController,
  modalController,
} from '@ionic/vue'
import { personCircle, search, addOutline } from 'ionicons/icons'

const store = reactive(useReadingStore());

const openCreate = async () => {
  const modal = await modalController.create({
    component: CreateReading,
  })

  modal.present()
  const { data, role } = await modal.onWillDismiss()

  if (role == 'submit') {
    const toast = await toastController.create({
      message: 'New Reading Saved!',
      position: 'top',
      color: 'success',
      duration: 1000,
      animated: true,
    })
    await toast.present()

    store.fetchReadings();
  }
}

const formatDt = (dt: number) => {
    return dayjs(dt).format("YYYY - MMMM");
}
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
          <ion-card-title>Latest Reading</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-label>80KWh</ion-label>
              </ion-col>
              <ion-col>
                <ion-label>&#8369; 1,500.00</ion-label>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <div style="margin-top: 1rem;">

      <ion-list>
        <ion-list-header>
          <ion-label>Reading List</ion-label>
        </ion-list-header>
        <ion-item-group v-for="read in store.readings">
          <ion-item-divider>
            <ion-label>{{ formatDt(read.dt) }}</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label>Reading: {{ read.val }}KWh</ion-label>
            <ion-label>Amount: &#8369; 1,500.00</ion-label>
          </ion-item>
        </ion-item-group>
      </ion-list>
      </div>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openCreate">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
