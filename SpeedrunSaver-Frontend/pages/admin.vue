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

let addgame = ref(false)
let addplatform = ref(false)
let showgames = ref(false)
let showplatforms = ref(false)

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
})
</script>