<script setup lang="ts">
import AppPackage from "@/../package.json";
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/vue'
import {
  gridOutline,
  readerOutline,
  information,
  informationCircleOutline,
  settingsOutline,
} from 'ionicons/icons'
import Logo from "@/Components/Logo.vue"

</script>

<template>
  <ion-app>
    <ion-menu content-id="main-content" ref="menu">
      <ion-header class="ion-no-border">
        <ion-toolbar>
          <Logo class="mx-auto w-10 h-10 fill-current text-indigo-600"></Logo>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-grid class="h-full flex flex-col justify-between">
          <ion-row>
            <ion-col>
              <ion-list>
                <ion-menu-toggle>
                  <ion-item router-link="/home">
                    <ion-icon :icon="gridOutline"></ion-icon>
                    <ion-label class="ml-2">Home</ion-label>
                  </ion-item>
                </ion-menu-toggle>

                <ion-menu-toggle>
                  <ion-item router-link="/list">
                    <ion-icon :icon="readerOutline"></ion-icon>
                    <ion-label class="ml-2">Readings</ion-label>
                  </ion-item>
                </ion-menu-toggle>

                <ion-menu-toggle>
                  <ion-item router-link="/settings">
                    <ion-icon :icon="settingsOutline"></ion-icon>
                    <ion-label class="ml-2">Settings</ion-label>
                  </ion-item>
                </ion-menu-toggle>

                <ion-menu-toggle>
                  <ion-item router-link="/about">
                    <ion-icon :icon="information"></ion-icon>
                    <ion-label class="ml-2">About</ion-label>
                  </ion-item>
                </ion-menu-toggle>
              </ion-list>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-list>
                <ion-item lines="none">
                  <ion-icon :icon="informationCircleOutline"></ion-icon>
                  <ion-label class="ml-2">v {{ AppPackage.version }}</ion-label>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-menu>

    <ion-router-outlet />
  </ion-app>
</template>
