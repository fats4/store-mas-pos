<template>
    <div class="flex h-screen">
        <!-- Left Side with Background Image -->
        <div class="flex w-screen">
            <img src="/assets/logimg.jpeg" alt="">
        </div>

        <!-- Right Side with Login Form -->
        <div class="w-screen flex flex-col justify-center items-center bg-white">
            <div class="w-2/3 max-w-md">
                <h1 class="text-3xl font-semibold mb-6 text-center">Login</h1>
                <form @submit.prevent="auth.login" class="space-y-4">
                    <div>
                        <label for="email" class="block text-gray-700">Masukan Email</label>
                        <input type="email" id="email" v-model="auth.email" placeholder="username/email"
                            class="w-full px-4 py-2 border rounded" required>
                    </div>
                    <div>
                        <label for="password" class="block text-gray-700">Masukan Password</label>
                        <input type="password" id="password" v-model="auth.password" placeholder="Password"
                            class="w-full px-4 py-2 border rounded" required>
                    </div>
                    <button type="submit"
                        class="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600">Login</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store';

const auth = useAuthStore();
</script>

<style scoped>
.bg-cover {
    background-size: cover;
}

.bg-center {
    background-position: center;
}
</style>
