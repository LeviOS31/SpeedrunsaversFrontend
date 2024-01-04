<template>
    <div class="mx-32 my-5 bg-gray-300 rounded-xl p-4">
        <div class="flex justify-between">
            <button @click="clickaddgame()" class="bg-green-600 w-full mx-2 py-1.5 my-1 rounded-xl text-white hover:bg-green-500">Add game</button>
            <button @click="clickaddplatform()" class="bg-green-600 w-full mx-2 py-1.5 my-1 rounded-xl text-white hover:bg-green-500">Add platform</button>
        </div>
        <div class="flex justify-between">
            <button @click="clickshowgames()" class="bg-gray-300 border-gray-500 border-2 w-full mx-2 py-1.5 my-1 rounded-xl text-black hover:bg-gray-400">Show games</button>
            <button @click="clickshowplatforms()" class="bg-gray-300 border-gray-500 border-2 w-full mx-2 py-1.5 my-1 rounded-xl text-black hover:bg-gray-400">Show platforms</button>
        </div>
    </div>
    <div class="mx-32 my-5 bg-gray-300 rounded-xl p-4">
        <AdminAddgame v-if="addgame"/>
        <AdminAddplatform v-if="addplatform"/>
        <AdminShowgames v-if="showgames"/>
        <AdminShowplatforms v-if="showplatforms"/>
    </div>
</template>

<script setup lang="ts">
import SignalRService from "~/composables/signalr";

let addgame = ref(false)
let addplatform = ref(false)
let showgames = ref(false)
let showplatforms = ref(false)
let connection: any;

function clickaddgame () {
    addgame.value = true
    addplatform.value = false
    showgames.value = false
    showplatforms.value = false
}

function clickaddplatform () {
    addplatform.value = true
    addgame.value = false
    showgames.value = false
    showplatforms.value = false
}

function clickshowgames () {
    showgames.value = true
    showplatforms.value = false
    addplatform.value = false
    addgame.value = false
}

function clickshowplatforms () {
    showplatforms.value = true
    showgames.value = false
    addgame.value = false
    addplatform.value = false
}

onMounted(async () => {
  let token = localStorage.getItem("token")
  let userid = localStorage.getItem("userid")
  if (token != null) {
    if(await verifyAdmin(token, userid)){
        console.log("admin")
    }
    else{
        window.location.href = "/"
    }
  }
  else{
    console.log("not logged in")
  }
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
})

onUnmounted(() => {
        connection.stop();
});

</script>