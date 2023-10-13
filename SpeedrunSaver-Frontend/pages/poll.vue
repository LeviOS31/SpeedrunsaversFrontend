<template>
    <div class="flex justify-center">
        <div class="w-9/12 bg-gray-300 rounded-xl my-10 p-4">
            <h2 class=" text-2xl">{{poll.pollName}}</h2>
            <p class="mt-1 flex items-center gap-x-2 text-sm leading-5 text-gray-500">total votes: {{ totalVotes }}</p>
            <div :key="rendervotes">
                <div v-for="option in poll.options">
                    <p>{{option}}</p>
                    <div class="flex">
                        <button type="button" @click="vote(poll.options.indexOf(option))" class="mr-4 rounded-md bg-gray-200 px-3.5 text-sm font-semibold text-green-600 shadow-sm hover:bg-indigo-100">Vote</button>
                        <div class="vote-bar">
                            <div class="filled-bar text-white py-1 px-2" :style="{ width: (poll.votes[poll.options.indexOf(option)] / totalVotes) * 100 + '%' }">
                                {{ poll.votes[poll.options.indexOf(option)] }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { getPoll } from '~/composables/Poll'
    import { sendvote } from '~/composables/Poll'

    const id = useRoute().query.id as string
    var poll = await getPoll(id)

    var rendervotes = ref(0)

    let totalVotes = 0
    for (let i = 0; i < poll.votes.length; i++) {
        totalVotes += poll.votes[i]
    }
    console.log(poll)
    console.log(totalVotes)

    async function vote (option: number) {
        console.log("voted for " + option)
        await sendvote(id, option)
        poll = await getPoll(id)

        totalVotes = 0
        for (let i = 0; i < poll.votes.length; i++) {
            totalVotes += poll.votes[i]
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