<template>
    <div class="flex justify-center items-center h-screen">
        <div class="w-1/3">
            <h1 class="text-2xl font-bold mb-4">Login</h1>
            <form @submit.prevent="auth.login">
            <div class="mb-4">
                <label for="email" class="block mb-2">Email</label>
                <input type="email" id="email" v-model="auth.email" class="w-full px-4 py-2 border rounded" required>
            </div>
            <div class="mb-4">
                <label for="password" class="block mb-2">Password</label>
                <input type="password" id="password" v-model="auth.password" class="w-full px-4 py-2 border rounded" required>
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store';

const auth = useAuthStore();
</script>