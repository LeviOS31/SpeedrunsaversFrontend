<template>
    <div class="mx-32 my-5 bg-gray-300 rounded-xl p-4">
        <input class="text-black px-2 py-1 w-full rounded-lg" type="text" placeholder="Search">
    </div>
    <div class="mx-32 my-5 flex">
        <div class="w-9/12 bg-gray-300 rounded-xl p-4">
            <div id="filters" class="mx-2 mb-4 bg-gray-400 px-2 py-1 rounded-xl">
                <button @click="openfilters()" class=" w-full">Filters</button>
            </div>
            <div class="flex">
                <GamesGrid :entries="entries"></GamesGrid>
            </div>
        </div>
        <div class=" w-3/12 bg-gray-300 rounded-xl ml-4 px-4 py-2">
            <h1 class="text-xl">Latest speedruns</h1>
            <SpeedrunsList></SpeedrunsList>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {getGames} from "~/composables/Game";
    const { $anime } =  useNuxtApp();
    let entries = await getGames();
    let filters = ref(false);
    // console.log(entries);

    function openfilters() {
        filters.value = !filters.value;
        if (filters.value) {
            //document.getElementById("filters").style.height = "auto";
            $anime({
                targets: '#filters',
                height: '100px',
                duration: 500,
                easing: 'easeInOutQuad'
            });
        } else {
            //document.getElementById("filters").style.height = "32px";
            $anime({
                targets: '#filters',
                height: '32px',
                duration: 500,
                easing: 'easeInOutQuad'
            });
        }
    }

    onMounted(() => {
    const socket = new WebSocket('ws://localhost:8082');

    socket.onopen = (event) => {
        console.log('WebSocket connection opened:', event);
    };

    socket.onmessage = (event) => {
        const data = event.data;
        console.log('Received message:', data);

        // Update your UI with the new data
        // For simplicity, let's just log it to the console
        document.body.innerHTML += `<p>${data}</p>`;
    };

    socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
})

</script>

<style scoped>
    #filters{
        height: 32px;
    }
</style>