<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed, defineAsyncComponent, ref } from 'vue'
import type { Reading, ReadingList } from '@/types/Reading'
import { useReadingStore } from '@/composables/useReadingStore'
import { formatDate, formatCurrency } from '@/utils'
import {
  IonTitle,
  IonToolbar,
  IonPage,
  IonHeader,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonLabel,
  IonText,
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
  IonModal,
  IonMenuToggle,
  IonSelect,
  IonSelectOption,
  toastController,
  useIonRouter,
  onIonViewWillEnter,
  actionSheetController,
  type SelectChangeEventDetail,
} from '@ionic/vue'
import { addOutline, colorWand, informationCircle } from 'ionicons/icons'
import Logo from '@/Components/Logo.vue'
import type { IonSelectCustomEvent } from '@ionic/core'

const Metrics = defineAsyncComponent(() => import('@/Pages/Partials/Metrics.vue'))
const Chart = defineAsyncComponent(() => import('@/Pages/Partials/Chart.vue'))
const CreateReading = defineAsyncComponent(() =>
  import('@/Modals/CreateReading.vue'),
)

const router = useIonRouter()
const { readings, orderedReadings, fetchReadings, createReading, setFilter } = useReadingStore()

const presentYear = ref<number>(dayjs().year())

onIonViewWillEnter(async () => {
  await fetchReadings()
  setFilter({ year: presentYear.value })
})

const years = computed(() => {
  const r = [...readings.value]

  const yrs: number[] = []

  r.forEach(v => {
    const yr = dayjs(v.dt).year()
    if(! yrs.includes(yr)) {
      yrs.push(yr)
    }
  })

  yrs.sort()
  yrs.reverse()

  return yrs;
})

const latestReadings = computed<ReadingList>(() => {
  const r = [...orderedReadings.value]
  return r.reverse().slice(0, 5)
})

const latestReadingsCount = computed<number>(() => {
  return latestReadings.value.length
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
    header: `Reading for ${formatDate(reading.dt, "YYYY - MMMM")}`,
    buttons: [
      {
        text: "View",
        handler: () => openDetails(reading)
      },
      {
        text: 'Edit',
        handler: () => openEdit(reading)
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

const changeYear = (ev: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
  presentYear.value = Number(ev.target.value);
  setFilter({ year: presentYear.value })
}
</script>

<template>
  <ion-page id="main-content">
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary" class="ion-no-border">
        <ion-buttons>
          <ion-menu-toggle>
            <ion-button fill="clear">
              <Logo class="w-8 h-8 fill-current text-white"></Logo>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- KPIs -->
      <div class="ion-padding">
        <div class="flex justify-between items-center">
          <ion-title>Welcome</ion-title>
          <ion-select interface="action-sheet" placeholder="Select Year" :selectedText="presentYear.toString()"
            @ion-change="changeYear">
            <template v-for="yr in years">
              <ion-select-option :value="yr">{{ yr }}</ion-select-option>
            </template>
          </ion-select>
        </div>
        <Metrics :year="presentYear"></Metrics>
      </div>

      <ion-card>
        <ion-card-content>
          <Chart :year="presentYear" :readings="orderedReadings"></Chart>
        </ion-card-content>
      </ion-card>
      <div class="mt-1">
        <ion-list>
          <ion-list-header>
            <ion-toolbar>
              <ion-label>Latest Readings</ion-label>
              <ion-buttons slot="primary" color="primary">
                <ion-button @click="() => $router.push('/list')" v-if="latestReadingsCount > 0">
                  View All
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-list-header>
          <ion-item-group v-for="read in latestReadings">
            <ion-item-divider>
              <ion-label>{{ formatDate(read.dt, "YYYY - MMMM") }}</ion-label>
            </ion-item-divider>
            <ion-item direction="forward" button @click="presentActionSheet(read)">
              <ion-grid>
                <ion-row>
                  <ion-col size-md="6">
                    <ion-label>Reading: {{ read.val }} kWh</ion-label>
                  </ion-col>
                  <ion-col size-md="6">
                    <ion-label>
                      Amount: {{ formatCurrency(read.amount) }}
                    </ion-label>
                  </ion-col>
                  <ion-col size-md="6">
                    <ion-label>Rate: {{ formatCurrency(read.rate) }}</ion-label>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
          </ion-item-group>
        </ion-list>
        <div v-if="latestReadingsCount == 0" class="text-center ion-margin ion-padding">
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

    <ion-modal :is-open="modalOpened" @willDismiss="modalWillDismiss">
      <ion-content>
        <CreateReading @cancel="modalOpened = false" @submit="submitCreate"></CreateReading>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>
