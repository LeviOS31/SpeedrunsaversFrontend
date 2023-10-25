<template>
    <div class="mx-32 my-10 flex" v-if="speedrun">
        <div class="w-9/12">
            <div class=" bg-gray-300 rounded-xl p-4 my-6 mr-2 flex">
                <img :src="speedrun.category.game.gameImage" alt="" width="200px" height="200px" class="pointer-events-none object-cover group-hover:opacity-75" />
                <div class="ml-5">
                    <NuxtLink :to="`/game?id=${speedrun.category.game.id}`" class="text-4xl font-bold text-green-600">{{ speedrun.category.game.gameName }}</NuxtLink>
                    <p class="font-semibold text-gray-500">{{ speedrun.category.game.gameDescription }}</p>
                    <p>Developer: {{ speedrun.category.game.developer }}</p>
                    <p>Publisher: {{ speedrun.category.game.publisher }}</p>
                    <p>Release date: {{ speedrun.category.game.releaseDate.split("T")[0] }}</p>
                    <div>
                        <div class=" bg-gray-400 w-fit px-2 py-1 rounded-xl font-semibold" v-for="platform in speedrun.category.game.platforms">
                            <p>{{ platform.platformName }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-black bg-gray-300 rounded-xl p-4 my-6 mr-2">
                <p class="text-gray-800 text-xl pb-2">
                    <span class=" font-bold text-black">{{ speedrun.category.categoryName }}</span>
                    in 
                    <span class="font-bold text-black">{{ speedrun.time.split("T")[1] }}</span>
                    by
                    <span class="font-bold text-black"> {{ speedrun.user.username }}</span>
                </p>
                <iframe class="w-full h-full aspect-video rounded-xl" style="" :src="`https://www.youtube.com/embed/${speedrun.videoLink.split('=')[1]}`" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                <p class="bg-gray-400 my-2 px-3 py-2 rounded-xl">
                    <span class="text-xl font-semibold">Description</span><br>
                    {{ speedrun.speedrunDescription }}
                </p>
                <div>
                    <p>Details</p>
                    <div class="grid grid-cols-3 gap-2">
                        <div class="bg-gray-400 rounded-lg p-4">
                            Category
                            <p class="font-semibold">{{ speedrun.category.categoryName }}</p>
                        </div>
                        <div class="bg-gray-400 rounded-lg p-4">
                            Rank
                            <p class="font-semibold">{{ speedrun.rank }}</p>
                        </div>
                        <div class="bg-gray-400 rounded-lg p-4">
                            Player
                            <p class="font-semibold">{{ speedrun.user.username }}</p>
                        </div>
                        <div class="bg-gray-400 rounded-lg p-4">
                            Platform
                            <p class="font-semibold">{{ speedrun.category.game.platforms[0].platformName }}</p>
                        </div>
                        <div class="bg-gray-400 rounded-lg p-4">
                            Time
                            <p class="font-semibold">{{ speedrun.time.split("T")[1] }}</p>
                        </div>
                        <div class="bg-gray-400 rounded-lg p-4">
                            Verified
                            <svg v-if="speedrun.status == 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7" style="color: #db6300;">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            <svg v-if="speedrun.status == 1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7" style="color: #00b100;">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <svg v-if="speedrun.status == 2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7" style="color: #da0000;">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="bg-gray-400 rounded-lg p-4">
                            Game
                            <p class="font-semibold">{{ speedrun.category.game.gameName }}</p>
                        </div>
                        <div class="bg-gray-400 rounded-lg p-4">
                            Date
                            <p class="font-semibold">{{ speedrun.date.split("T")[0] }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-3/12">
            <div class=" bg-gray-300 rounded-xl my-6 ml-2 px-4 py-2">
                <h1 class="text-xl">Latest speedruns</h1>
                <SpeedrunsList></SpeedrunsList>
            </div>
            <div class=" bg-gray-300 rounded-xl p-4 my-6 ml-2">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {Getspeedrun} from "~/composables/Speedrun";

let id: string;
let speedrun: any;

let componentkey = ref(0);

id = useRoute().query.id as string
let idnumber = parseInt(id)
console.log(id)

speedrun = await Getspeedrun(idnumber)
console.log(speedrun)

onMounted(() => {
    let images = document.querySelectorAll('img')
    for(let image of images)
    {
        image.width = 200
        image.height = 200
    }
})

</script>