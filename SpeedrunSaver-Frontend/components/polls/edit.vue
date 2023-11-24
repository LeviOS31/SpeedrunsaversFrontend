<template>
    <form>
        <div class="flex flex-col">
            <label for="pollName" class="mb-1">Poll Name</label>
            <input type="text" name="pollName" class="p-1 w-full mb-1">
            <div id="options">
                <div v-for="option in poll.poll.options">
                    <label for="option1" class="mb-1">Option 1</label>
                    <input type="text" name="option1" class="p-1 w-full mb-1">
                </div>
            </div>
            <button type="button" @click="addoption" class="w-fit px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-500 mr-1">Add Option</button>
            <button type="button" @click="submit" class="w-fit px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-500 mr-1">Submit</button>
        </div>
    </form>
</template>
<script setup>
const prop = defineProps({
    poll: {
        type: Object,
        required: true
    }
})
</script>