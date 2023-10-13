<template>
    <div class="mx-32 my-10 flex">
    
        <div class="flex w-9/12 bg-gray-300 rounded-xl p-4">
            <GamesGrid :entries="entries"></GamesGrid>
        </div>
        <div class=" w-3/12">

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