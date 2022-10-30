import type { Reading, ReadingList } from "@/types/Reading";
import store from "@/store";
import { computed, onMounted, ref, type Ref } from "vue";

export function useReadingStore() {
    const readings: Ref<ReadingList> = ref([]);

    const fetchReadings = async () => {
        readings.value = await store.fetchAll();
    }

    const createReading = async (reading: Reading) => {
        const key = reading.dt.toString();
        await store.save(key, reading);
        readings.value.push(reading);
    }

    const fetchReading = async (key: string): Promise<Reading | null> => {
        const v = await store.find(key);
        if (v == null) {
            return null;
        }

        return JSON.parse(atob(v));
    }

    const deleteReading = async (reading: Reading) => {
        const key = reading.dt.toString();
        await store.remove(key);
        readings.value.splice(readings.value.indexOf(reading), 1);
    }

    const orderedReadings = computed<ReadingList>(() => {
        return readings.value.reverse();
    })

    const latestReadings = computed<ReadingList>(() => {
        return readings.value.reverse().slice(0,5);
    })

    return {
        store,
        readings,
        orderedReadings,
        latestReadings,
        fetchReadings,
        fetchReading,
        createReading,
        deleteReading,
    }
}