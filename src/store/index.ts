import type { Reading, ReadingList } from '@/types/Reading';
import { Storage } from '@ionic/storage';

const store = new Storage();
store.create();

const save = async (key: string, data: object) => {
  const val = btoa(JSON.stringify(data));
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

const find = async (key: string) => {
    return await store.get(key);
}

const remove = async (key: string) => {
    return await store.remove(key);
}

export default {
    store,
    fetchAll,
    save,
    find,
    remove,
};