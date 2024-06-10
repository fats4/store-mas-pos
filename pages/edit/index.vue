<template>
    <div class="container mx-auto py-8 px-6">
        <h1 class="text-2xl font-bold mb-4">Daftar Produk</h1>
        <div class="flex justify-between">
            <button @click="addProd" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">add
                product</button>
            <button @click="categ" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">category
                product</button>
            <button @click="goToHome"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Home</button>
        </div>
        <div v-if="authStore.list && authStore.list.length"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="product in authStore.list" :key="product.id" class="bg-white shadow-md rounded-lg p-4">
                <img :src="product.picture_url" alt="Product Image" class="w-full h-40 object-cover mb-4" />
                <h2 class="text-lg font-bold mb-2">{{ product.name }}</h2>
                <p class="text-gray-500 mb-2">Harga: Rp {{ product.price }}</p>
                <div class="flex justify-between">
                    <button @click="editProduct(product.id)"
                        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Edit</button>
                    <button @click="deleteProduct(product.id)"
                        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
    authStore.fetchProducts();
});

const addProd = () => {
    router.push('../add/');
};

const goToHome = () => {
    router.push('/');
};

const categ = () => {
    router.push('../category/');
};

const editProduct = (productId) => {
    router.push(`/edit/${productId}`);
};

const deleteProduct = async (productId) => {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (confirmed) {
        const success = await authStore.deleteProduct(productId);
        if (success) {
            alert('Product deleted successfully');
        } else {
            alert('Failed to delete product');
        }
    }
};
</script>
