import type { Reading } from "@/types/Reading";
import store from "@/store";
import { onMounted, ref, type Ref } from "vue";

export function useReadingStore() {
    const readings: Ref<Reading[]> = ref([]);

    onMounted(async () => await fetchReadings())

    const createReading = async (reading: Reading) => {
        await store.save(reading);
        readings.value.push(reading);
    }

    const fetchReadings = async () => {
        readings.value = await store.fetchAll();
    }

    return {
        store,
        readings,
        createReading,
        fetchReadings,
    }
}