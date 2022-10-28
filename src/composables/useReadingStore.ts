import type { Reading, ReadingList } from "@/types/Reading";
import store from "@/store";
import { computed, ref, type Ref } from "vue";

export function useReadingStore() {
    const readings: Ref<ReadingList> = ref([]);

    const createReading = async (reading: Reading) => {
        await store.save(reading);
        readings.value.push(reading);
    }

    const fetchReadings = async () => {
        readings.value = await store.fetchAll();
    }

    const orderedReadings = computed<ReadingList>(() => {
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