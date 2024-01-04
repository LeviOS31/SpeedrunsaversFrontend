<template>
  <div class="w-full">
    <button v-if="admin && !createpoll" @click="create_poll()" class="w-full bg-green-600 py-2 text-center rounded-lg text-white hover:bg-green-700">Add poll</button>
    <ul v-if="!createpoll" role="list" class="divide-y divide-gray-100 w-full">
      <li v-for="poll in polls" :key="poll.id" class="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap">
        <div>
          <p class="text-sm font-semibold leading-6 text-gray-900">
            <NuxtLink :to="`/poll?id=${poll.id}`" class="hover:underline">{{ poll.pollName }}</NuxtLink>
          </p>
          <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
            <p>
              <time :datetime="poll.dateCreated">{{ poll.dateCreated }}</time>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="createpoll">
      <form>
        <h2 class=" text-2xl ml-1 mb-2"> Add poll </h2>
        <input type="text" placeholder="Poll name" name="pollName" class="w-full border-2 border-gray-300 p-2 rounded-lg mb-2">
        <label class="text-xl">Options</label>
        <div id="options" class="w-full mt-2 bg-gray-200 p-4 rounded-lg">
          <button type="button" @click="addoption()" class="bg-green-600 mb-4 py-1 rounded-lg w-full text-center text-white" >
            Add option
          </button>
          <input type="text" placeholder="Option 1" name="option1" class="p-1 w-full mb-1">
          <input type="text" placeholder="Option 2" name="option2" class="p-1 w-full mb-1">
        </div>
        <button @click="submit()" type="button" class="px-2 py-1 bg-green-600 text-white rounded-lg mt-2">Add poll</button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { CreatePoll,getPolls } from '~/composables/Poll';

  const prop = defineProps({
      admin: {
          type: Boolean,
          required: true
      }
  })

  var polls = ref(await getPolls())

  var createpoll = ref(false)

  function create_poll(){
    createpoll.value = true
  }

  function addoption(){
    var count = document.querySelectorAll("#options input").length + 1
    console.log(count)
    document.querySelector("#options").insertAdjacentHTML("beforeend", '<input type="text" placeholder="Option '+count+'" name="option'+count+'" class="p-1 w-full mb-1">')
  }

  async function submit(){
    var pollName = document.querySelector("input[name='pollName']").value
    var options = []
    var optioncount = document.querySelectorAll("#options input").length
    var votes = []
    for(var i = 1; i <= optioncount; i++){
      options.push(document.querySelector("input[name='option"+i+"']").value)
      votes.push(0)
    }
    console.log(pollName)
    console.log(options)
    
    var data = {
      poll: {
        id: "",
        pollName: pollName,
        options: options,
        votes: votes,
        active: true,
        visible: true,
        dateCreated: new Date().toISOString()
      },
      token: localStorage.getItem("token"),
      userid: localStorage.getItem("userid")
    }
    var json = JSON.stringify(data)
    
    console.log(json)
    let result = await CreatePoll(json)
    if(result == 200){
      polls.value = await getPolls()
    }
    createpoll.value = false
  }
</script>