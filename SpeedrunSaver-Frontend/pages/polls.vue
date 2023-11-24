<template>
  <div class="mx-32 my-10 flex">
    
      <div class="flex w-full bg-gray-300 rounded-xl p-4">
        <PollsList v-if="loggedin" :polls="polls" :admin="admin"></PollsList>
        <div v-if="!loggedin" class="flex w-full flex-col items-center">
            <p class="mb-1 max-w-2xl text-lg leading-10 text-gray-600">You need to be logged in to view the polls.</p>
            <div>
                <NuxtLink :to="'/login'" class="w-fit px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-500 mr-1">Login</NuxtLink>
            </div>
        </div>
      </div>
  </div>
</template>
  
<script setup>
    import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
    import { getPolls } from '~/composables/Poll'
    

    let loggedin = ref(false)
    let admin = ref(false)

    onMounted(async () => {
      let token = localStorage.getItem("token")
      let userid = localStorage.getItem("userid")
      if (token != null) {
        if(await verifyAdmin(token, userid)){
            console.log("admin")
            admin.value = true
            loggedin.value = true
        }
        else{
          admin.value = false
          loggedin.value = true
        }
      }
      else{
        console.log("not logged in")
      }
    })

    const polls = await getPolls()
</script>