import type { Reading, ReadingList } from '@/types/Reading';
import { Storage } from '@ionic/storage';

const store = new Storage();
store.create();

const save = async (reading: Reading) => {
  const key = reading.dt.toString();
  const val = btoa(JSON.stringify(reading));
  return await store.set(key, val);
}

const fetchAll = async (): Promise<ReadingList> => {
    let readings: Reading[] = [];

    await store.forEach(v => {
        const reading = JSON.parse(atob(v));

        readings.push(reading);
    })

    return readings;
}

const fetchKeys = async () => {
    return await store.keys();
}

const find = async (key: string) => {
    return await store.get(key);
}

export default {
    store,
    save,
    fetchKeys,
    find,
    fetchAll,
};