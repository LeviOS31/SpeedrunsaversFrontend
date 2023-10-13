<template>
    <div class="min-h-full">
      <Disclosure as="nav" class="bg-green-600" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-8 w-8" :src="`/LogoSpeedRunSaver.png`" alt="Your Company" />
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <NuxtLink v-for="item in navigation" :key="item.name" :to="item.link" class="text-white hover:bg-green-500 hover:bg-opacity-75 rounded-md px-3 py-2 text-sm font-medium">{{ item.name }}</NuxtLink >
                 
                </div>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-green-600 p-2 text-green-200 hover:bg-green-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <NuxtLink :to="`/login`" class=" justify-self-end text-green-500 bg-gray-200 px-2 py-1 rounded-md hover:bg-slate-300">login</NuxtLink>
          </div>
        </div>
      </Disclosure>
    </div>
  </template>
  
  <script setup>
  import { Disclosure, DisclosureButton} from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

  const navigation = [
    { name: 'Games', link: '/', current: true },
    { name: 'Users', link: '/users', current: false },
    { name: 'Polls', link: '/polls', current: false },
  ]
  </script>