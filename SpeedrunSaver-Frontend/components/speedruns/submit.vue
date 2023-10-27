<template>
    <form>
        <div class="space-y-12 sm:space-y-16">
            <div v-if="loggedin">
                <h2 class="text-base font-semibold leading-7 text-gray-900">SUBMIT RUN</h2>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                <div class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="runname" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Run Name</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                            <input type="text" name="runname" id="runname" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6" />
                            <p id="runname-error" class=" text-red-500"></p>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="description" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Description</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                            <textarea id="description" name="description" rows="3" class="block w-full max-w-2xl rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                            <p class="mt-3 text-sm leading-6 text-gray-600">You can add extra info about the run here like what game version you are on.</p>
                            <p id="description-error" class=" text-red-500"></p>
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="videolink" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Speedrun Youtube link</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                            <input type="text" name="videolink" id="videolink" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6" />
                            <p id="videolink-error" class=" text-red-500"></p>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Time</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                            <div class="x-input-runtime-container">
                                <input type="number" name="hour" maxlength="3" autocomplete="off" class="x-input-runtime" aria-label="In-Game Time hours" value="">
                                <div class="x-input-runtime-unit" aria-hidden="true">h</div>
                                <input type="number" name="minute" maxlength="2" autocomplete="off" class="x-input-runtime" aria-label="In-Game Time minutes" value="">
                                <div class="x-input-runtime-unit" aria-hidden="true">m</div>
                                <input type="number" name="second" maxlength="2" autocomplete="off" class="x-input-runtime" aria-label="In-Game Time seconds" value="">
                                <div class="x-input-runtime-unit" aria-hidden="true">s</div>
                                <input type="number" name="millisecond" maxlength="3" autocomplete="off" class="x-input-runtime" aria-label="In-Game Time milliseconds" value="">
                                <div class="x-input-runtime-unit" aria-hidden="true">ms</div>
                            </div>
                            <p id="time-error" class=" text-red-500"></p>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="category" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Category</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                        <select id="category" name="category" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option v-for="category in props.categories" :value="category.id">{{ category.categoryName }}</option>
                        </select> 
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="platform" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Platform</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                        <select id="platform" name="platform" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option v-for="platform in props.game.platforms" :value="platform.id">{{ platform.platformName }}</option>
                        </select>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6" v-if="loggedin">
            <button type="button" @click="submit()" class="inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Save</button>
        </div>
        <div v-if="!loggedin" class="flex flex-col items-center">
            <p class="mb-1 max-w-2xl text-lg leading-10 text-gray-600">You need to be logged in to submit a run.</p>
            <div>
                <NuxtLink :to="'/login'" class="w-fit px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-500 mr-1">Login</NuxtLink>
                <NuxtLink @click="reload()" class="w-fit px-3 py-2 bg-gray-200 border-2 border-gray-500 text-black rounded-xl hover:bg-gray-100">Back</NuxtLink>
            </div>
        </div>
    </form>
</template>
<script setup lang="ts">
import { SubmitSpeedrun } from '~/composables/Speedrun';

let loggedin = ref(false)

let props = defineProps({
    game: {
        type: Object,
        required: true
    },
    categories: {
        type: Array,
        required: true
    }
})

function reload(){
    window.location.reload()
}

function submit (){
    console.log("submit")
    document.getElementById("runname-error").innerHTML = ""
    document.getElementById("videolink-error").innerHTML = ""
    document.getElementById("time-error").innerHTML = ""
    let runname = document.getElementById("runname") as HTMLInputElement
    let description = document.getElementById("description") as HTMLInputElement
    let videolink = document.getElementById("videolink") as HTMLInputElement
    let hour = document.getElementsByName("hour")[0] as HTMLInputElement
    let minute = document.getElementsByName("minute")[0] as HTMLInputElement
    let second = document.getElementsByName("second")[0] as HTMLInputElement
    let millisecond = document.getElementsByName("millisecond")[0] as HTMLInputElement
    let category = document.getElementById("category") as HTMLInputElement
    let platform = document.getElementById("platform") as HTMLInputElement
    
    if(!checkname(runname.value)){
        let error = document.getElementById("runname-error") as HTMLInputElement
        error.innerHTML = "Run name must be at least 3 characters long"
        return
    }
    if(!checklink(videolink.value)){
        let error = document.getElementById("videolink-error") as HTMLInputElement
        error.innerHTML = "Video link must be a valid youtube link"
        return
    }
    if(!checktime(parseInt(hour.value),parseInt(minute.value), parseInt(second.value), parseInt(millisecond.value))){
        let error = document.getElementById("time-error") as HTMLInputElement
        error.innerHTML = "Time must be a valid time"
        return
    }

    let time = new Date(0,0,0,parseInt(hour.value),parseInt(minute.value), parseInt(second.value), parseInt(millisecond.value)).toISOString();

    let dataspeedrun = `
        {
            "speedrunName": "${runname.value}",
            "speedrunDescription": "${description.value}",
            "time": "${time}",
            "date": "${new Date().toISOString()}",
            "videoLink": "${videolink.value}",
            "categoryId": ${category.value},
            "platformId": ${platform.value},
            "status": 0,
            "userId": ${localStorage.getItem("userid")}
        }
    `
    console.log(dataspeedrun)
    console.log(SubmitSpeedrun(dataspeedrun))
}

function checkname(name:string){
    if(name.length < 3){
        return false
    }
    return true
}

function checklink(link:string){
    if(link.length < 3){
        return false
    }
    const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(\S+)?$/;
    if(!youtubeRegex.test(link)){
        return false
    }
    return true
}

function checktime(hour:number, minute:number, second:number, millisecond:number){
    if(isNaN(hour) || isNaN(minute) || isNaN(second) || isNaN(millisecond)){
        return false
    }
    if(hour < 0 || minute < 0 || second < 0 || millisecond < 0){
        return false
    }
    if(minute == 0 && second == 0){
        return false
    }
    if(minute > 59) {
        return false
    }
    if(second > 59) {
        return false
    }
    if(millisecond > 999) {
        return false
    }
    return true
}

onMounted(async () => {
    let token = localStorage.getItem("token")
    let userid = localStorage.getItem("userid")
    if (token != null) {
      if(await verify(token, userid)) {
        loggedin.value = true
        console.log("logged in")
      }
    }
  })


</script>

<style>
    .x-input-runtime-container {
        tab-size: 4;
        line-height: inherit;
        font-style: normal;
        box-sizing: border-box;
        border: 0 solid #e5e7eb;
        position: relative;
        display: flex;
        max-width: 100%;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: stretch;
        justify-content: flex-start;
        border-radius: .375rem;
    }
    .x-input-runtime:first-child {
        tab-size: 4;
        box-sizing: border-box;
        border: 0 solid #e5e7eb;
        margin: 0;
        appearance: none;
        border-radius: 0;
        padding: .5rem .75rem;
        height: 2.5rem;
        width: 3.5rem;
        padding-right: .5rem;
        text-align: right;
        font-size: .875rem;
        line-height: 1.5rem;
        border-top-left-radius: .375rem;
        border-bottom-left-radius: .375rem;
        border-left-width: 1px;
    }

    .x-input-runtime-unit {
        height: 2.5rem;
        border-top-width: 1px;
        border-bottom-width: 1px;
        background-color: #ffffff;
        font-size: .875rem;
        line-height: 2.5rem;
    }

    .x-input-runtime {
        height: 2.5rem;
        width: 3.5rem;
        background-color: #ffffff;
        padding-right: 0.5rem;
        text-align: right;
        font-size: .875rem;
        line-height: 1.5rem;
        border: 1px solid #ffffff;
    }

    .x-input-runtime::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    .x-input-runtime-unit:last-child {
        border-top-right-radius: 0.375rem;
        border-bottom-right-radius: 0.375rem;
        border-right-width: 1px;
        padding-right: 1rem;
    }
</style>