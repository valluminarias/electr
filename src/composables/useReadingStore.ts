import type { Reading } from "@/types/Reading";
import store from "@/store";
import { computed, ref, type Ref } from "vue";

export function useReadingStore() {
    const readings: Ref<Reading[]> = ref([]);

    const createReading = async (reading: Reading) => {
        await store.save(reading);
        readings.value.push(reading);
    }

    const fetchReadings = async () => {
        readings.value = await store.fetchAll();
    }

    const orderedReadings = computed(() => {
        return readings.value.reverse();
    })

    fetchReadings();

    return {
        store,
        readings,
        orderedReadings,
        createReading,
        fetchReadings,
    }
}