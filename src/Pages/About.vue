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
} from '@ionic/vue'
import { arrowBack } from 'ionicons/icons'
import Logo from '@/assets/logo.svg';
import AppPackage from "@/../package.json";
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

        <ion-title>About</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
        <div>
          <Logo class="mx-auto w-16 h-16 fill-current text-indigo-600"></Logo>
        </div>
        <div class="text-center">
            <h2>{{ AppPackage.name }}</h2>
            <h6>version {{ AppPackage.version }}</h6>
        </div>
    </ion-content>
  </ion-page>
</template>
