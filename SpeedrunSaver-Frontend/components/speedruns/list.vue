<template>
    <ul role="list" class="divide-y divide-gray-100 w-full">
        <li v-for="run in speedruns" :key="run.id">
            <NuxtLink :to="`/speedrun?id=${run.id}`" class=" bg-gray-300 hover:bg-gray-100 w-full">
                <div class="flex bg-none">
                    <div class="mr-4 bg-none">
                        <img width="47" height="47" class="smallimg" :src="run.category.game.gameImage">
                    </div>
                    <p class=" w-28 mr-2 overflow-hidden" bg-none>
                        {{ run.speedrunName }}<br>
                        <span class="text-sm text-gray-500">{{ run.user.username }}</span>
                    </p>
                    <p>
                        <span>{{ run.time.split("T")[1] }}</span><br>
                        <span class="text-sm text-gray-500">{{ run.category.categoryName }}</span>
                    </p>
                </div>
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { getLatestSpeedruns } from "~/composables/Speedrun";
let speedruns = await getLatestSpeedruns();
console.log("latestruns:");
console.log(speedruns);

onMounted(() => {
    let images = document.querySelectorAll('.smallimg')
    for(let image of images)
    {
        image.width = 47
        image.height = 47
    }
})

</script>