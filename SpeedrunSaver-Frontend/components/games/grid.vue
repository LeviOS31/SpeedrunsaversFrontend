<template>
    <NuxtLink v-for="entry in props.entries" :to="`/game?id=${entry.id}`" class="mx-2 group aspect-h-7 aspect-w-10 block w-fit p-2 overflow-hidden rounded-lg bg-gray-400">
        <img :src="entry.gameImage" alt="" width="200px" height="200px" class="pointer-events-none object-cover group-hover:opacity-75" />
        <span class="sr-only">{{ entry.gameName }}</span>
        <p class="pointer-events-none mt-2 text-center block truncate text-sm font-medium text-gray-900">{{ entry.gameName }}</p>
    </NuxtLink>
</template>

<script setup lang="ts">
let props = defineProps({
    entries: {
        type: Array,
        required: true
    }
})
onMounted(() => {
    let images = document.querySelectorAll('img')
    for(let image of images)
    {
        image.width = 200
        image.height = 200
    }
})

</script>