<template>
  <div class="mx-32 my-10 flex">
    
      <div class="flex w-9/12 bg-gray-300 rounded-xl p-4">
        <PollsList :polls="polls"></PollsList>
      </div>
      <div class=" w-3/12">

      </div>
  </div>
</template>
  
<script setup>
    import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
    import { getPolls } from '~/composables/Poll'

    const polls = await getPolls()
</script>