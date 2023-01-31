import { Storage } from '@ionic/storage';

const store = new Storage();
store.create();

const save = async (key: string, data: any) => {
  return await store.set(key, data);
}

const fetchAll = async () => {
    let data: string[] = [];

    await store.forEach(v => {
        data.push(v);
    })

    return data;
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