<script lang="ts" setup>
defineProps<{
    metric: {
        title: string,
        data: string,
        prevData: string
    }
}>()
</script>

<template>
    <div class="px-4 py-5 sm:p-6">
        <dt class="text-sm font-normal text-gray-100">{{ metric.title }}</dt>
        <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold text-indigo-500">
                {{ metric.data }}
                <span class="ml-2 text-sm font-medium text-gray-400" v-if="metric.prevData">
                    from {{ metric.prevData }}
                </span>
            </div>
        </dd>
    </div>
</template>