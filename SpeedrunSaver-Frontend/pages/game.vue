<template>
<div class="mx-32 my-10 flex" v-if="game">
    <div class="w-9/12">
        <div class=" bg-gray-300 rounded-xl p-4 my-6 mr-2 flex">
            <img :src="game.gameImage" alt="" width="200px" height="200px" class="pointer-events-none object-cover group-hover:opacity-75" />
            <div class="ml-5">
                <p>{{ game.gameName }}</p>
                <p>About: {{ game.gameDescription }}</p>
                <p>Developer: {{ game.developer }}</p>
                <p>Publisher: {{ game.publisher }}</p>
                <p>Release date: {{ game.releaseDate.split("T")[0] }}</p>
            </div>
        </div>
        <div class=" bg-gray-300 rounded-xl p-4 my-6 mr-2">
            <div class="sm:flex sm:items-center">
                <div class="w-full flex items-center">
                    <h1 class="text-base text-center font-semibold leading-6 text-gray-900 mr-2">category:</h1>
                    <select id="category" name="category" @change="changedCategory" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option v-for="category in categories" :value="category.id">{{ category.categoryName }}</option>
                    </select>
                </div>
                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <NuxtLink :to="`/uploadspeedrun`" class="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload speedrun</NuxtLink>
                </div>
            </div>
            <SpeedrunsTable  v-if="speedrunscategory" :speedruns="speedrunscategory" :key="categoryid" ></SpeedrunsTable>
        </div>
    </div>
    <div class="w-3/12">
        <div class=" bg-gray-300 rounded-xl p-4 my-6 ml-2">
        </div>
        <div class=" bg-gray-300 rounded-xl p-4 my-6 ml-2">
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
    import {getGame} from "~/composables/Game";
    import {getCategories} from "~/composables/Category";
    import {getSpeedrunsByCategory} from "~/composables/Speedrun";

    let id: string;
    let game:any;
    
    id = useRoute().query.id as string
    let idnumber = parseInt(id)
    console.log(id)
    
    game = await getGame(idnumber)
    console.log(game)
    
    let categories = await getCategories(idnumber)
    console.log(categories)
    let categoryid = categories[0].id;
    console.log(categoryid.value)

    let speedrunscategory = await getSpeedrunsByCategory(categoryid)
    console.log(speedrunscategory)

    async function changedCategory (event) {
        console.log(event.target.value)
        categoryid = event.target.value
        speedrunscategory = await getSpeedrunsByCategory(categoryid)
    }

    onMounted(() => {
        let images = document.querySelectorAll('img')
        for(let image of images)
        {
            image.width = 200
            image.height = 200
        }
    })
</script>
