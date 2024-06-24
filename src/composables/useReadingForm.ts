import type { Reading } from '@/types/Reading'
import dayjs from 'dayjs'
import { computed, ref, watch, watchEffect } from 'vue'
import { v4 as uuidv4 } from 'uuid';

export function useReadingForm() {
    const orig: Reading = {
        _id: uuidv4(),
        dt: dayjs().valueOf(),
        period_from: dayjs().valueOf(),
        period_to: dayjs().valueOf(),
        val: 0,
        amount: 0,
        rate: 0,
        current: 0,
        previous: 0,
        due_date: undefined,
    }
    const reading = ref<Reading>(orig);

    const dt_from = ref(dayjs().format('YYYY-MM-DD'))
    const dt_to = ref(dayjs().format('YYYY-MM-DD'))
    const dt_due = ref(null)

    const setReading = (r: Reading) => {
        reading.value = r
    }

    const resetReading = () => {
        Object.assign(reading, orig)
    }

    const computedRate = computed(() => {
        return Number(Number(reading.value.rate).toFixed(2)) * 1
    })

    watchEffect(() => {
        if (reading.value) {
            dt_from.value = dayjs(reading.value.period_from).format('YYYY-MM-DD')
            dt_to.value = dayjs(reading.value.period_to).format('YYYY-MM-DD')

            if (reading.value.previous && reading.value.current) {
                reading.value.val = reading.value.current - reading.value.previous
            }
        }
    })

    watch(dt_from, (v) => {
        reading.value.period_from = dayjs(v).valueOf()
    })

    watch(dt_to, (v) => {
        reading.value.dt = reading.value.period_to = dayjs(v).valueOf()
    })

    watch(dt_to, (v) => {
        if(dt_to) {
            reading.value.due_date = dayjs(v).valueOf()
        }
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
        dt_from,
        dt_to,
        dt_due,
        setReading,
        resetReading,
        computedRate,
    }
}
