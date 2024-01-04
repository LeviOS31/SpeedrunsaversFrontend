<template>
    <div class="mx-32 my-10 flex">
        <div class="flex w-9/12 bg-gray-300 rounded-xl p-4">
        </div>
        <div class=" w-3/12">
  
        </div>
    </div>
</template>

<script setup>
import SignalRService from "~/composables/signalr";
    let connection;

    onMounted(() => {
        connection = SignalRService.startSignalRConnection();
        connection.on('ReceiveMessage', (message) => {
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