<template>
    <div class="height flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto" src="/LogoSpeedRunSaver.png" width="200" height="200" alt="Workflow">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <form class="mt-8 space-y-6">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="username" class="sr-only">Username</label>
                        <input id="username" name="username" type="text" autocomplete="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Username">
                    </div>
                    <div class="relative">
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Password">
                        <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center" @click="togglePasswordVisibility">
                            <svg class="h-5 w-5 text-gray-400" :class="{'text-gray-500': showPassword}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path :class="{'hidden': showPassword}" fill-rule="evenodd" d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" clip-rule="evenodd" />
                                <path :class="{'hidden': !showPassword}" fill-rule="evenodd" d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-8a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM6.343 6.343a4 4 0 0 1 0 5.657l1.414-1.414a2 2 0 0 0 0-2.828l-1.414-1.415zm7.07-1.414a4 4 0 0 1 5.657 0l-1.414 1.414a2 2 0 0 0-2.828 0l-1.415-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div>
                    <button type="button" @click="submit()" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <!-- Heroicon name: solid/lock-closed -->
                            <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 2a3 3 0 0 0-3 3v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V5a3 3 0 0 0-3-3zm-1 10a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm1-8a1 1 0 0 1 1 1v2h-2V5a1 1 0 0 1 1-1z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { login } from "~/composables/User";
import { ref } from "vue";

const showPassword = ref(false);

async function submit() {
    let inputs = document.getElementsByTagName("input");
    
    let object = {
        id: 0,
        username: inputs[0].value,
        password: inputs[1].value,
        country: "",
        email: "",
        admin: false,
    }

    let user = JSON.stringify(object);
    await login(user);
}

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
    let passwordInput = document.getElementById("password");
    if (showPassword.value) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
</script>

<style>
.height{
    height: auto;
}
</style>
