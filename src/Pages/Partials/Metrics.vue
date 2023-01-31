<script lang="ts" setup>
import { computed, onBeforeUpdate, onMounted, onUpdated } from 'vue';
import { useReadingStore } from '@/composables/useReadingStore'
import dayjs from 'dayjs';

const { filteredReadings, latestReading, previousReading, largestReading, fetchReadings, setFilter } = useReadingStore()

const props = defineProps<{
    year: number
}>()

onMounted(() => {
    fetchReadings()
    setFilter({year: props.year})
})

onUpdated(() => {
    fetchReadings()
})

const average = computed<number>(() => {
    if (filteredReadings.value.length == 0) return 0
    const sum = filteredReadings.value.reduce((sum, r) => {
        return sum + r.val
    }, 0);
    return  sum / filteredReadings.value.length
  })

const largestMonth = computed<String>(() => {
    if (Object.keys(largestReading.value).length == 0) return "--"
    return dayjs(largestReading.value.dt).format('MMMM')
})

</script>

<template>
    <div class="flex justify-around">
        <dl
            class="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
            <div class="px-4 py-5 sm:p-6">
                <dt class="text-base font-normal text-gray-900">Latest Reading</dt>
                <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                    <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
                        {{ latestReading?.val ?? 0 }}kWh
                        <span class="ml-2 text-sm font-medium text-gray-500"> from {{ previousReading?.val ?? 0 }}kWh
                        </span>
                    </div>
                </dd>
            </div>

            <div class="px-4 py-5 sm:p-6">
                <dt class="text-base font-normal text-gray-900">Avg. Reading (kWh)</dt>
                <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                    <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
                        {{ average.toFixed(1) }}kWh
                    </div>
                </dd>
            </div>
        </dl>

        <dl
            class="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
            <div class="px-4 py-5 sm:p-6">
                <dt class="text-base font-normal text-gray-900">Largest Reading(kWh)</dt>
                <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                    <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
                        {{ largestReading.val ?? 0 }}kWh
                    </div>
                </dd>
            </div>

            <div class="px-4 py-5 sm:p-6">
                <dt class="text-base font-normal text-gray-900">Largest Reading Month</dt>
                <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                    <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
                        {{ largestMonth }}
                    </div>
                </dd>
            </div>
        </dl>
    </div>
</template>