<template>
    <div class="flex flex-col items-center">
        <!-- Background Image -->
        <div class="w-full">
            <img src="/assets/logo.jpeg" alt="Background" class="w-full h-48 object-cover">
        </div>
        <!-- Profile Picture and Info -->
        <div class="mt-[-50px] bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-11/12 md:w-1/2 lg:w-1/3">
            <img src="/assets/vaz.jpeg" alt="Profile Picture" class="w-24 h-24 rounded-full mb-4 object-cover">
            <h1 class="text-2xl font-bold mb-2">{{ auth.profile.name }}</h1>
            <h2 class="text-xl font-semibold mb-2">Information</h2>
            <p class="text-gray-700 mb-1"><strong>Name:</strong> {{ auth.profile.name }}</p>
            <p class="text-gray-700 mb-4"><strong>Email:</strong> {{ auth.profile.email }}</p>
            <button @click="goToHome"
                class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">Home</button>

        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store'
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
    auth.fetchProfile();
});

const goToHome = () => {
    router.push('/');
};

const editProfile = () => {
    router.push('/edit-profile');
};
</script>

<style scoped>
.bg-cover {
    background-size: cover;
}
</style>
