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
import { usePowerCalculator } from "@/composables/usePowerCalculator";

const { powerUsage, inKilowatt, dailyUsage, dailyAmount, monthlyUsage, monthlyAmount } = usePowerCalculator()

const emit = defineEmits<{
  (e: 'cancel'): void,
}>()

const cancel = () => {
  emit('cancel')
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
      <ion-title class="ion-text-center">Power Consumption Calculator</ion-title>
      <ion-buttons slot="end">
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">

    <ion-list lines="full">
      <ion-list-header>
        <ion-label>Calculate Power Consumption</ion-label>
      </ion-list-header>

      <ion-item>
        <ion-label>
          <h3>Rated Current</h3>
          <p>(Amp)</p>
        </ion-label>
        <ion-input
          type="number"
          class="text-end"
          placeholder="Choose Date"
          v-model="powerUsage.current"
          slot="end"
          :clear-input="true"
          @focusin="$event.target.select()"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>
          <h3>Voltage</h3>
          <p>(Volt)</p>
        </ion-label>
        <ion-input
          type="number"
          class="text-end"
          v-model="powerUsage.voltage"
          slot="end"
          :clear-input="true"
          @focusin="$event.target.select()"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>
          <h3>Power</h3>
          <p>(Watt)</p>
        </ion-label>
        <ion-input
          type="number"
          class="text-end"
          slot="end"
          :clear-input="true"
          v-model="powerUsage.power"
          @focusin="$event.target.select()"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>
          <h3>Usage Duration</h3>
          <p>(Hrs/day)</p>
        </ion-label>
        <ion-input
          type="number"
          class="text-end"
          :clear-input="true"
          v-model="powerUsage.duration"
          @focusin="$event.target.select()"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>Rate Per kWh</ion-label>
        <ion-input
          type="number"
          class="text-end"
          :clear-input="true"
          v-model="powerUsage.ratePerKw"
          @focusin="$event.target.select()"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>
          <h3>In kW</h3>
          <p>(W / 1000)</p>
        </ion-label>
        <ion-label class="text-end">
          {{ inKilowatt }}kW
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <h3>Daily Usage</h3>
          <p>(kWh / day)</p>
        </ion-label>
        <ion-label class="text-end">
          {{ dailyUsage }}kW
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>Daily Usage Amount</ion-label>
        <ion-label class="text-end">
          &#8369;{{ dailyAmount }} / {{ powerUsage.duration }}Hrs
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <h3>Monthly Usage</h3>
          <p>(kWh / month)</p>
        </ion-label>
        <ion-label class="text-end">
          {{ monthlyUsage }}kW
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <h3>Monthly Usage Amount</h3>
        </ion-label>
        <ion-label class="text-end">
          &#8369;{{ monthlyAmount }} / month
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>
