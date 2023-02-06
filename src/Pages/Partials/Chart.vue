<script lang="ts" setup>
import type { Reading, ReadingList } from '@/types/Reading'
import dayjs from 'dayjs'
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import {  useDark } from "@vueuse/core";

const isDark = useDark()

const props = defineProps<{
  year: number
  readings: ReadingList
}>()

const chartOptions = computed(() => {
  let categories = props.readings.map((r: Reading) =>
    dayjs(r.dt).format('MMMM'),
  )
  return {
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: isDark.value ? new Array(categories.length).fill('#fff') : undefined
        }
      }
    },
    yaxis: {
      title: {
        text: 'KWh',
        style: {
          color: isDark.value ? '#fff' : undefined
        }
      },
    },
    title: {
      text: 'Monthly Readings',
      style: {
        color: isDark.value ? '#fff' : undefined
      }
    },
    chart: {
      id: 'readings-chart',
      height: 300,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: isDark.value ? ['#3e3efe'] : undefined
      }
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 1,
      shape: 'circle',
    },
  }
})

const chartData = computed(() => {
  let data = props.readings.map((r: Reading) => r.val)
  return [
    {
      name: 'Readings',
      data: data,
    },
  ]
})
</script>

<template>
  <VueApexCharts
    type="line"
    :options="chartOptions"
    :series="chartData"
  ></VueApexCharts>
</template>
