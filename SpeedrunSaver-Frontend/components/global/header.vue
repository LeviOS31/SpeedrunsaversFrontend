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
                  <NuxtLink v-if="reload" v-for="item in navigation" :key="item.name" :to="item.link" class="text-white hover:bg-green-500 hover:bg-opacity-75 rounded-md px-3 py-2 text-sm font-medium">{{ item.name }}</NuxtLink >
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
            <NuxtLink v-if="!loggedin" :to="`/login`" class=" justify-self-end text-green-600 bg-white px-2 py-1 rounded-md hover:bg-gray-200">login</NuxtLink>
            <div v-if="loggedin" class="text-green-600">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-green-600 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    {{ username }}
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-slot="{ active }">
                        <NuxtLink :to="`/accountdetail`"  :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Account settings</NuxtLink>
                      </MenuItem>
                      <form method="POST" action="#">
                        <MenuItem v-slot="{ active }">
                          <button @click="logout()" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Sign out</button>
                        </MenuItem>
                      </form>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  </template>
  
  <script setup lang="ts">
  import { verify } from '~/composables/User'
  import { Disclosure, DisclosureButton} from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
  import {getuser} from '~/composables/User'
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { ChevronDownIcon } from '@heroicons/vue/20/solid'

  let loggedin = ref(false)
  let dropdown = ref(false)
  let username = ref("");

  let reload = ref(true)

  const navigation = [
    { name: 'Games', link: '/', current: true },
    { name: 'Users', link: '/users', current: false },
    { name: 'Polls', link: '/polls', current: false },
  ]
  
  function dropdownswitch(){
    dropdown.value = !dropdown.value
    if(dropdown.value){
      document.getElementById("dropdown").style.visibility = "visible"
    }
    else{
      document.getElementById("dropdown").style.visibility = "hidden"
    }
  }

  onMounted(async () => {
    let token = localStorage.getItem("token")
    let userid = localStorage.getItem("userid")
    if (token != null) {
      if(await verify(token, userid)) {
        loggedin.value = true
        console.log("logged in")
        let user = await getuser(userid)
        username.value = user.username
        if(await verifyAdmin(token, userid)){
          navigation.push({ name: 'Admin', link: '/admin', current: false })
          console.log("admin")
          reload.value = false
          reload.value = true
        }
      }
      else{
        localStorage.removeItem("token")
        localStorage.removeItem("userid")
        window.location.href = "/login"
      }
    }
  })

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("userid")
    window.location.href = "/"
  }
  </script>