import type { Reading } from '@/types/Reading'
import dayjs from 'dayjs'
import { computed, ref, watch, watchEffect, type Ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';

export function useReadingForm() {
    const reading = ref<Reading>({
        _id: uuidv4(),
        dt: dayjs().valueOf(),
        val: 0,
        amount: 0,
        rate: 0,
    });
    const dt = ref(dayjs().format('YYYY-MM-DD'))

    const setReading = (r: Reading) => {
        reading.value = r
    }

    const computedRate = computed(() => {
        return Number(Number(reading.value.rate).toFixed(2)) * 1
    })

    watchEffect(() => {
        if (reading.value) {
            dt.value = dayjs(reading.value.dt).format('YYYY-MM-DD')
        }
    })

    watch(dt, (v) => {
        reading.value.dt = dayjs(v).valueOf()
    })

    watch(
        () => reading.value.val,
        (v) => {
            if (v > 0 && reading.value.amount > 0) {
                reading.value.rate = reading.value.amount / reading.value.val
            }
        },
    )

    watch(
        () => reading.value.amount,
        (v) => {
            if (v > 0 && reading.value.val > 0) {
                reading.value.rate = v / reading.value.val
            }
        },
    )

    return {
        reading,
        dt,
        setReading,
        computedRate,
    }
}
