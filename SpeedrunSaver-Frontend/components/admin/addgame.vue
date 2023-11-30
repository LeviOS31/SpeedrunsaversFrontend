<template>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <div>
        <h2 class=" text-2xl font-bold">New Game</h2>
        <div class="flex justify-between my-4">
            <label for="name">Name:</label>
            <input type="text" id="name" class="w-11/12 px-3 py-2 rounded-lg" v-model="FormData.gameName" required>
        </div>
        <div class="flex justify-between my-4">
            <label for="description">Description:</label>
            <textarea id="description" class="w-11/12 resize-none px-3 py-2 rounded-lg" v-model="FormData.gameDescription"></textarea>
        </div>
        <div class="flex justify-between my-4">
            <label for="developer">Developer:</label>
            <input type="text" id="developer" class="w-11/12 px-3 py-2 rounded-lg" v-model="FormData.developer" required>
        </div>
        <div class="flex justify-between my-4">
            <label for="publisher">Publisher:</label>
            <input type="text" id="publisher" class="w-11/12 px-3 py-2 rounded-lg" v-model="FormData.publisher" required>
        </div>
        <div class="flex justify-between my-4">
            <label for="release_date">Release date:</label>
            <input type="date" id="release_date" class="w-11/12 px-3 py-2 rounded-lg" v-model="FormData.release_date" required>
        </div>
        <div class="flex justify-between my-4">
            <label for="platform">Platforms:</label>
            <!-- <Multiselect v-model="FormData.platforms" :options="platforms"></Multiselect> -->
            <select id="platform" class="w-11/12 px-3 py-2 rounded-lg" multiple required>
                <option  v-for="platform in platforms" :value="platform.id">{{platform.platformName}}</option>
            </select>
        </div>
        <div class="flex justify-between my-4">
            <label for="image">Image:</label>
            <input class="w-11/12" type="file" id="image" required>
        </div>
        <button @click="submit()" class="bg-green-600 w-full py-1.5 mt-6 rounded-xl text-white hover:bg-green-500">Add game</button>
    </div>
</template>

<script setup>
import {getPlatforms} from "~/composables/Platform"
import {createGame} from "~/composables/Game"

let platforms = await getPlatforms();

let FormData = {
    platforms: [],
}


function submit(){
    //let imagename = document.getElementById("image").files[0].name
    FormData.gameImage = document.getElementById("image").files[0].name
    let platformids = getSelectValues(document.getElementById("platform"));
    console.log(platformids)
    platformids.forEach(element => {
        FormData.platforms.push({
            id: element,
            manufacturer: "",
            platformName: "",
        })
    });
    FormData.token = localStorage.getItem("token")
    FormData.userId = localStorage.getItem("userid")
    console.log(FormData)
    createGame(FormData)
    window.location.reload();
}

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>