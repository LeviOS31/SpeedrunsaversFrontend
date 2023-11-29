<template>
    <div class="flex justify-center">
        <PollsEdit v-if="Edit" :poll="poll" :back="back"></PollsEdit>
        <div v-if="!Edit" class="w-9/12 bg-gray-300 rounded-xl my-10 p-4">
            <div class="flex justify-between">
                <h2 class=" text-2xl">{{poll.pollName}}</h2>
                <button v-if="admin" @click="makeeditable()" class=" bg-green-600 px-2 py-1 rounded-lg text-white">Edit poll</button>
            </div>
            <p class="mt-1 flex items-center gap-x-2 text-sm leading-5 text-gray-500">total votes: {{ totalVotes }}</p>
            <div :key="rendervotes" class="mb-4">
                <div v-for="option in poll.options">
                    <p>{{option}}</p>
                    <div class="flex">
                        <button v-if="poll.active" type="button" @click="vote(poll.options.indexOf(option))" class="mr-4 rounded-md bg-gray-200 px-3.5 text-sm font-semibold text-green-600 shadow-sm hover:bg-indigo-100">Vote</button>
                        <div class="vote-bar">
                            <div class="filled-bar text-white py-1 px-2" :style="{ width: (poll.votes[poll.options.indexOf(option)] / totalVotes) * 100 + '%' }">
                                {{ poll.votes[poll.options.indexOf(option)] }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NuxtLink :to="'/polls'" class="px-2 py-1 border-gray-500 border text-black rounded-lg">Back</NuxtLink>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { getPoll } from '~/composables/Poll'
    import { sendvote } from '~/composables/Poll'

    const id = useRoute().query.id as string
    var poll = ref(await getPoll(id))

    var rendervotes = ref(0)

    let totalVotes = 0
    for (let i = 0; i < poll.value.votes.length; i++) {
        totalVotes += poll.value.votes[i]
    }

    var admin = ref(false)
    var Edit = ref(false)

    onMounted(async () => {
      let token = localStorage.getItem("token")
      let userid = localStorage.getItem("userid")
      if (token != null) {
        if(await verifyAdmin(token, userid)){
            admin.value = true
        }
        else{
          admin.value = false
        }
      }
      else{
      }
    })

    function makeeditable(){
        Edit.value = true
    }

    async function back(){
        Edit.value = false
        poll.value = await getPoll(id)
    }

    async function vote (option: number) {
        await sendvote(id, option)
        poll.value = await getPoll(id)

        totalVotes = 0
        for (let i = 0; i < poll.value.votes.length; i++) {
            totalVotes += poll.value.votes[i]
        }

        rendervotes.value += 1
    }

</script>

<style>
.vote-bar {
    width: 100%;
    background-color: #ddd; /* Background color of the entire bar */
    border-radius: 5px;   /* Rounded corners for the bar */
}

.filled-bar {
    height: 100%;
    background-color: #16a34a; /* Color of the filled portion of the bar */
    border-radius: 5px;         /* Rounded corners for the filled portion */
    transition: width 0.3s;    /* Add a smooth transition effect */
}
</style>