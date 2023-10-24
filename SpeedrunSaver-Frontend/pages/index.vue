<template>
    <div class="mx-32 my-10 flex">
    
        <div class="flex w-9/12 bg-gray-300 rounded-xl p-4">
            <GamesGrid :entries="entries"></GamesGrid>
        </div>
        <div class=" w-3/12 bg-gray-300 rounded-xl ml-4 px-4 py-2">
            <h1 class="text-xl">Latest speedruns</h1>
            <SpeedrunsList></SpeedrunsList>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {getGames} from "~/composables/Game";
    let entries = await getGames();
    // console.log(entries);
</script>

<style scoped>

</style>