import type { Reading, ReadingList } from "@/types/Reading";
import store from "@/store";
import { computed, ref, unref, type Ref } from "vue";

export function useReadingStore() {
    const readings: Ref<ReadingList> = ref([]);

    const fetchReadings = async () => {
        readings.value = await store.fetchAll();
    }

    const fetchReading = async (key: string): Promise<Reading | null> => {
        const v = await store.find(key);
        if (v == null) {
            return null;
        }

        return JSON.parse(atob(v));
    }

    const createReading = async (reading: Reading) => {
        const key = reading._id;
        await store.save(key, reading);
        readings.value.push(reading);
    }

    const updateReading = async (reading: Reading) => {
        await deleteReading(reading);
        await store.save(reading._id, reading);
        readings.value.push(reading);
    }

    const deleteReading = async (reading: Reading) => {
        const key = reading._id;
        await store.remove(key);
        readings.value.splice(readings.value.indexOf(reading), 1);
    }

    const orderedReadings = computed<ReadingList>(() => {
        const r = [...unref(readings)]
        return r.sort((a, b) => a.dt - b.dt)
    })

    return {
        readings,
        orderedReadings,
        fetchReadings,
        fetchReading,
        createReading,
        updateReading,
        deleteReading,
    }
}