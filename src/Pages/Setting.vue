<script lang="ts" setup>
import {
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonHeader,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonLabel,
  IonList,
  IonItem,
  IonToggle,
} from '@ionic/vue'
import { useDark, useToggle } from '@vueuse/core';
import { arrowBack, moonOutline } from 'ionicons/icons'

const isDark = useDark()
const toggleDark = useToggle(useDark())
</script>

<template>
  <ion-page id="main-content">
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary" class="ion-no-border">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
          <ion-button direction="back" @click.prevent="$router.back()">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item lines="full">
          <ion-icon slot="start" :icon="moonOutline"></ion-icon>
          <ion-label>
            Toggle Dark Mode
          </ion-label>
          <ion-toggle slot="end" :checked="isDark" @ion-change="toggleDark()"></ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
