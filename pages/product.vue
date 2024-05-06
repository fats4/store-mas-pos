<template>
    <div class="container mx-auto py-8 px-6">
        <h1 class="text-2xl font-bold mb-4">Products</h1>
        <div class="flex flex-row flex-wrap gap-4 items-center justify-center">
            <!-- Loop through each product in the array -->
            <div v-for="(product) in auth.list" :key="product.id" class="bg-white shadow-md border border-blue-500 rounded-lg p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                <img :src="product.picture_url" alt="Product Image" class="w-full h-40 object-cover mb-4">
                <h2 class="text-lg font-bold mb-2">{{ product.name }}</h2>
                <p class="text-gray-500 mb-2">Name: {{ product.name }}</p>
                <p class="text-gray-500 mb-2">Price: Rp {{ product.price }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store';

const auth = useAuthStore();

onMounted(() => {
    auth.fetchProducts();
});
</script>
