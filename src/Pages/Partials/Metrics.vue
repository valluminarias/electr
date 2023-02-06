<script lang="ts" setup>
import dayjs from 'dayjs';
import { computed, nextTick, onMounted, onUpdated, ref, unref, watch } from 'vue';
import { useReadingStore } from '@/composables/useReadingStore'
import MetricBlock from "@/Components/Metrics/MetricBlock.vue";
import { useDark } from "@vueuse/core";

const isDark = useDark()

const { filteredReadings, latestReading, previousReading, largestReading, fetchReadings, setFilter } = useReadingStore()

const props = defineProps<{
    year: number
}>()

watch(
    () => props.year,
    (newVal, oldVal) => {
        updateFilter()
    },
    { deep: true }
)

const updateFilter = () => {
    setFilter({
        year: props.year
    })
}

const average = computed<number>(() => {
    const r = [...filteredReadings.value]
    if (r.length == 0) return 0
    const sum = r.reduce((sum, r) => {
        return sum + r.val
    }, 0);
    return sum / r.length
})

const largestMonth = computed<String>(() => {
    const r = Object.assign({}, unref(largestReading.value))
    if (Object.keys(r).length == 0) return "--"
    return dayjs(r.dt).format('MMMM')
})

let metrics = ref<{ title: string; data: string; prevData: string; }[]>()

const setMetrics = () => {
    metrics.value = [
        {
            title: 'Latest Reading',
            data: (latestReading.value?.val ?? 0) + 'kWh',
            prevData: (previousReading.value?.val ?? 0) + 'kWh'
        },
        {
            title: 'Avg. Reading (kWh)',
            data: (average.value.toFixed(1) ?? 0) + 'kWh',
            prevData: ''
        },
        {
            title: 'Largest Reading(kWh)',
            data: (largestReading.value.val ?? 0) + 'kWh',
            prevData: ''
        },
        {
            title: 'Largest Reading Month',
            data: largestMonth.value.toString(),
            prevData: ''
        },
    ]
}

onMounted(() => {
    fetchReadings()
    updateFilter()

    setTimeout(setMetrics, 150)
})

onUpdated(() => {
    fetchReadings()
})

</script>

<template>
    <div class="flex justify-around">
        <dl
            class="metrics mt-5 grid grid-cols-2 rounded-lg overflow-hidden shadow divide-y md:grid-cols-4 md:divide-y-0 divide-x">
            <MetricBlock :metric="metric" v-for="(metric, k) in metrics" :key="k"></MetricBlock>
        </dl>
    </div>
</template>

<style scoped>
    .metrics {
        @apply bg-white divide-gray-200
    }

    .dark .metrics {
        @apply bg-gray-800 divide-gray-700
    }
</style>