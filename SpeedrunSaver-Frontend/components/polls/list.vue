<template>
    <div class="w-full">
      <button v-if="admin" class="w-full bg-green-600 py-2 text-center rounded-lg text-white hover:bg-green-700">Add poll</button>
      <ul role="list" class="divide-y divide-gray-100 w-full">
        <li v-for="poll in prop.polls" :key="poll.id" class="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap">
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
    </div>
</template>
<script setup lang="ts">
    const prop = defineProps({
        polls: {
            type: Array,
            required: true
        },
        admin: {
            type: Boolean,
            required: true
        }
    })
</script>