<template>
    <form>
        <div class="space-y-12 sm:space-y-16">
            <div>
                <h2 class="text-base font-semibold leading-7 text-gray-900">SUBMIT RUN</h2>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                <div class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="runname" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Run Name</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input type="text" name="runname" id="runname" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="My first run" />
                            </div>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="description" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Description</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                            <textarea id="description" name="description" rows="3" class="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <p class="mt-3 text-sm leading-6 text-gray-600">You can add extra info about the run here like what game version you are on.</p>
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="videolink" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Speedrun video link</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                        <input type="text" name="videolink" id="videolink" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" />
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
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="category" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Category</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                        <select id="category" name="category" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option v-for="category in props.categories" :value="category.id">{{ category.categoryName }}</option>
                        </select>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="category" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Platform</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                        <select id="category" name="category" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option v-for="platform in props.platforms" :value="platform.id">{{ platform.platformName }}</option>
                        </select>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </form>
</template>
<script setup lang="ts">
let props = defineProps({
    game: {
        type: Object,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    platforms: {
        type: Array,
        required:true
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