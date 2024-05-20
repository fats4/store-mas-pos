<template>
    <div class="flex flex-col bg-gray-100 p-4 items-center justify-center">
        <h1 class="text-2xl font-bold mb-4">Profile Info</h1>
        <p class="text-gray-700">Email: {{ auth.profile.data.email }}</p>
        <p class="text-gray-700">Name: {{ auth.profile.data.name }}</p>
        <button @click="goToHome" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Home</button>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store'

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
    auth.fetchProfile();
});

const goToHome = () => {
    router.push('/product');
};
</script>