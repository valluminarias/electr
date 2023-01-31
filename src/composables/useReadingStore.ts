import type { Reading, ReadingList } from "@/types/Reading";
import store from "@/store";
import { computed, ref, type Ref } from "vue";
import dayjs from "dayjs";

export interface ReadingsFilter {
  year: number
}

export function useReadingStore() {
  const readings: Ref<ReadingList> = ref([]);

  const filter = ref<ReadingsFilter>({
    year: new Date().getFullYear()
  })

  const fetchReadings = async () => {
    readings.value = await store.fetchAll();
  };

  const fetchReading = async (key: string): Promise<Reading | null> => {
    const v = await store.find(key);
    if (v == null) {
      return null;
    }

    return JSON.parse(atob(v));
  };

  const createReading = async (reading: Reading) => {
    const key = reading._id;
    await store.save(key, reading);
    readings.value.push(reading);
  };

  const updateReading = async (reading: Reading) => {
    await deleteReading(reading);
    await store.save(reading._id, reading);
    readings.value.push(reading);
  };

  const deleteReading = async (reading: Reading) => {
    const key = reading._id;
    await store.remove(key);
    readings.value.splice(readings.value.indexOf(reading), 1);
  };

  const setFilter = (filters: ReadingsFilter) => {
    filter.value = filters
  }

  const filteredReadings = computed<ReadingList>(() => {
    return [...readings.value].filter((r) => {
        return dayjs(r.dt).year() == filter.value.year
    })
  })

  const orderedReadings = computed<ReadingList>(() => {
    const r = [...filteredReadings.value];
    return r.sort((a, b) => a.dt - b.dt);
  });

  const latestReading = computed<Reading | undefined>(() => {
    return [...orderedReadings.value].reverse().shift();
  });

  const previousReading = computed<Reading | undefined>(() => {
    const r = [...orderedReadings.value].reverse();

    r.shift();

    return r.shift();
  });

  const average = computed<number>(() => {
    if (filteredReadings.value.length == 0) return 0
    const sum = filteredReadings.value.reduce((sum, r) => {
        return sum + r.val
    }, 0);
    return  sum / filteredReadings.value.length
  })

  const largestReading = computed<Reading>(() => {
    return filteredReadings.value.reduce((largest, r) => {
        if(largest.val == undefined) {
            largest = r
        }
        return (Number(largest.val) < Number(r.val)) ? r : largest
    }, <Reading>{})
  })

  return {
    readings,
    orderedReadings,
    latestReading,
    previousReading,
    average,
    largestReading,
    setFilter,
    fetchReadings,
    fetchReading,
    createReading,
    updateReading,
    deleteReading,
  };
}
