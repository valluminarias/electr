import type { PowerUsage } from "@/types/PowerUsage"
import { computed, ref, watch } from "vue"

export function usePowerCalculator() {
    const powerUsage = ref<PowerUsage>({
        current: 0.0,
        voltage: 0.0,
        power: 0.0,
        duration: 0.0,
        ratePerKw: 0.0,
    })

    watch(powerUsage, (v) => {
        v.power = v.current * v.voltage
    }, { deep: true })

    const inKilowatt = computed(() => {
        return Number(powerUsage.value.power / 1000).toFixed(2)
    })
    const inKilowattHour = computed(() => {
        const kWh = powerUsage.value.duration > 0 ? (Number(inKilowatt.value) / powerUsage.value.duration) : 0;
        return Number(kWh).toFixed(2)
    })
    const dailyUsage = computed(() => {
        const amount = Number(inKilowatt.value) * powerUsage.value.duration
        return Number(amount).toFixed(2)
    })
    const dailyAmount = computed(() => {
        const amount = Number(dailyUsage.value) * powerUsage.value.ratePerKw
        return Number(amount).toFixed(2)
    })
    const monthlyUsage = computed(() => {
        const amount = Number(dailyUsage.value) * 30
        return Number(amount).toFixed(2)
    })
    const monthlyAmount = computed(() => {
        const amount = Number(dailyAmount.value) * 30
        return Number(amount).toFixed(2)
    })

    return {
        powerUsage,
        inKilowatt,
        inKilowattHour,
        dailyUsage,
        dailyAmount,
        monthlyUsage,
        monthlyAmount,
    }
}