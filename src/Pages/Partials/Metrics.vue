<script lang="ts" setup>
import dayjs from "dayjs";
import { computed, onMounted, onUpdated, ref, unref, watch } from "vue";
import { useReadingStore } from "@/composables/useReadingStore";
import MetricBlock from "@/Components/Metrics/MetricBlock.vue";
import { IonSkeletonText } from "@ionic/vue";

const {
    filteredReadings,
    latestReading,
    previousReading,
    largestReading,
    fetchReadings,
    setFilter,
} = useReadingStore();

const props = defineProps<{
    year: number;
}>();

watch(
    () => props.year,
    (newVal, oldVal) => {
        updateFilter();
    },
    { deep: true }
);

const updateFilter = () => {
    setFilter({
        year: props.year,
    });
};

const average = computed<number>(() => {
    const r = [...filteredReadings.value];
    if (r.length == 0) return 0;
    const sum = r.reduce((sum, r) => {
        return sum + r.val;
    }, 0);
    return sum / r.length;
});

const largestMonth = computed<String>(() => {
    const r = Object.assign({}, unref(largestReading.value));
    if (Object.keys(r).length == 0) return "--";
    return dayjs(r.dt).format("MMMM");
});

let metrics = computed<{ title: string; data: string; prevData: string }[]>(() => [
    {
        title: "Latest Reading",
        data: (latestReading.value?.val ?? 0) + "kWh",
        prevData: (previousReading.value?.val ?? 0) + "kWh",
    },
    {
        title: "Avg. Reading (kWh)",
        data: (average.value.toFixed(1) ?? 0) + "kWh",
        prevData: "",
    },
    {
        title: "Largest Reading(kWh)",
        data: (largestReading.value.val ?? 0) + "kWh",
        prevData: "",
    },
    {
        title: "Largest Reading Month",
        data: largestMonth.value.toString(),
        prevData: "",
    },
])

const loading = ref(true)
onMounted(async () => {
    await fetchReadings();
    updateFilter();
    loading.value = false
});

onUpdated(() => {
    fetchReadings();
});
</script>

<template>
    <div class="flex justify-around">
        <dl
            class="metrics mt-5 grid grid-cols-2 rounded-lg overflow-hidden shadow divide-y md:grid-cols-4 md:divide-y-0 divide-x">

            <div class="w-44"  v-for="(metric, k) in metrics" :key="k" >
                <MetricBlock :metric="metric" v-if="!loading"></MetricBlock>

                <div class="metric-block px-4 py-5 sm:p-6" v-if="loading">
                    <dt>
                        <ion-skeleton-text :animated="true" style="width: 50%"></ion-skeleton-text>
                    </dt>
                    <dd class="mt-2">
                        <ion-skeleton-text :animated="true" style="width: 80%"></ion-skeleton-text>
                    </dd>
                </div>
            </div>
        </dl>
    </div>
</template>

<style scoped>
.metrics {
    @apply bg-white divide-gray-200;
}

.dark .metrics {
    @apply bg-gray-800 divide-gray-700;
}
</style>
