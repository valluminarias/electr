<script lang="ts" setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { useReadingStore } from '@/composables/useReadingStore'
import type { Reading } from '@/types/Reading'
import { formatDate, formatCurrency } from '@/utils'
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
  IonModal,
  useIonRouter,
  onIonViewWillEnter,
  actionSheetController,
  toastController,
} from '@ionic/vue'
import { arrowBack, colorWand, addOutline, informationCircle } from 'ionicons/icons'

const CreateReading = defineAsyncComponent(() =>
  import('@/Modals/CreateReading.vue'),
)

const router = useIonRouter()
const { fetchReadings, orderedReadings, createReading } = useReadingStore()

onIonViewWillEnter(async () => await fetchReadings())

const readings = computed(() => {
  const r = [...orderedReadings.value]
  return r.reverse()
})

const openDetails = async (reading: Reading) => {
  const key = reading._id

  router.push(`/readings/${key}`)
}

const openEdit = async (reading: Reading) => {
  const key = reading._id
  router.push(`/readings/${key}/edit`)
}

const presentActionSheet = async (reading: Reading) => {
  const actionSheet = await actionSheetController.create({
    header: `Reading for ${formatDate(reading.dt)}`,
    buttons: [
      {
        text: 'View',
        handler: () => openDetails(reading),
      },
      {
        text: 'Edit',
        handler: () => openEdit(reading),
      },
      {
        text: 'Cancel',
        role: 'cancel',
      },
    ],
  })

  await actionSheet.present()
}

const modalOpened = ref(false)

const openCreate = async () => {
  modalOpened.value = true
}

const modalWillDismiss = () => {
  modalOpened.value = false
}

const submitCreate = async (data: Reading) => {
  await createReading(data)

  const toast = await toastController.create({
    icon: informationCircle,
    message: 'New Reading Saved!',
    position: 'top',
    color: 'success',
    duration: 1000,
    animated: true,
  })
  await toast.present()
  modalOpened.value = false
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
        <ion-buttons slot="primary">
          <ion-button fill="outline" @click="openCreate">
            Create
            <ion-icon slot="end" :icon="addOutline"></ion-icon>
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
          @click="presentActionSheet(read)"
        >
          <ion-label>{{ formatDate(read.dt) }}</ion-label>
          <ion-label slot="end">{{ formatCurrency(read.amount) }}</ion-label>
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

    <ion-modal :is-open="modalOpened" @willDismiss="modalWillDismiss">
      <ion-content>
        <CreateReading
          @cancel="modalOpened = false"
          @submit="submitCreate"
        ></CreateReading>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>
