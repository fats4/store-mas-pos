<template>
    <div class="container mx-auto w-1/2 content-center justify-center flex flex-col my-auto h-screen">
        <h1 class="text-2xl font-bold mb-4 text-center">Edit Produk</h1>
        <div v-if="selectedProduct">
            <form @submit.prevent="updateProduct">
                <div
                    class="flex flex-row-reverse justify-between items-center border-2 border-orange-300 p-3 rounded-lg">
                    <div class="w-2/3">
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
                            <label for="picture_url" class="block text-sm font-medium text-gray-700">URL Gambar
                                Produk</label>
                            <input type="text" v-model="selectedProduct.picture_url" id="picture_url"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                    </div>
                    <div class="bg-red-200 w-1/3 mr-7 ">
                        <div class="">
                            <img :src="selectedProduct.picture_url" alt="Product Image" class="object-fill" />
                        </div>
                    </div>
                </div>

                <div class="flex justify-between pt-2">
                    <button type="submit"
                        class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">Update
                        Produk</button>

                    <button @click="goBack"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Back</button>
                </div>
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