<script lang="ts" setup>
import type { Reading, ReadingList } from '@/types/Reading'
import dayjs from 'dayjs'
import { computed, unref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

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
    },
    yaxis: {
      title: {
        text: 'KWh',
      },
    },
    title: {
      text: 'Monthly Readings',
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
