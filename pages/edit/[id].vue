<!-- pages/products/edit.vue -->
<template>
    <div class="container mx-auto py-8 px-6">
        <h1 class="text-2xl font-bold mb-4">Edit Produk</h1>
        <div v-if="selectedProduct">
            <form @submit.prevent="updateProduct">
                <div class="mb-4">
                    <label for="category_id" class="block text-sm font-medium text-gray-700">Category ID</label>
                    <input type="text" v-model="selectedProduct.category_id" id="category_id"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Nama Produk</label>
                    <input type="text" v-model="selectedProduct.name" id="name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div class="mb-4">
                    <label for="price" class="block text-sm font-medium text-gray-700">Harga Produk</label>
                    <input type="number" v-model="selectedProduct.price" id="price"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div class="mb-4">
                    <label for="picture_url" class="block text-sm font-medium text-gray-700">URL Gambar Produk</label>
                    <input type="text" v-model="selectedProduct.picture_url" id="picture_url"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div class="mb-4">
                    <img :src="selectedProduct.picture_url" alt="Product Image" class="w-40 h-40 object-cover" />
                </div>
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update Produk</button>

                <button @click="goBack"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Home</button>
            </form>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const selectedProduct = computed(() => authStore.selectedProduct);

const goBack = () => {
    router.push('/edit/');
};

onMounted(async () => {
    const productId = route.params.id;
    await authStore.fetchProduct(productId);
});

const updateProduct = async () => {
    const success = await authStore.updateProduct(selectedProduct.value);
    if (success) {
        router.push('/edit/');
    } else {
        alert('Failed to update product');
    }
};
</script>