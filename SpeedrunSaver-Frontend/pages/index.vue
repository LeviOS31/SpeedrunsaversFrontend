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
    import SignalRService from "~/composables/signalr";
    import {getGames} from "~/composables/Game";

    let connection: any;

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
        connection = SignalRService.startSignalRConnection();
        connection.on('ReceiveMessage', (message:any) => {
            console.log(message);
            document.getElementById("Polls").innerHTML = document.getElementById("Polls")?.innerHTML + `
            <div v-if="notifciation" class="absolute right-0 top-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                </svg>
            </div>
            `; 
            localStorage.setItem("notification", "true");
        });

        if (localStorage.getItem("notification") == "true") {
            document.getElementById("Polls").innerHTML = document.getElementById("Polls")?.innerHTML + `
            <div v-if="notifciation" class="absolute right-0 top-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                </svg>
            </div>
            `; 
        }
    });

    onUnmounted(() => {
        connection.stop();
    });
</script>

<style scoped>
    #filters{
        height: 32px;
    }
</style>