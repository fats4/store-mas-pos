<template>
    <div class="container mx-auto py-8 px-6">
        <h1 class="text-2xl font-bold mb-4">Tambah Produk</h1>
        <form @submit.prevent="addProduct">
            <div class="mb-4">
                <label for="category_id" class="block text-sm font-medium text-gray-700">Category ID</label>
                <select v-model="product.category_id" id="category_id"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option disabled value="">Pilih Kategori</option>
                    <option v-for="category in catgStore.categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Nama Produk</label>
                <input type="text" v-model="product.name" id="name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="price" class="block text-sm font-medium text-gray-700">Harga Produk</label>
                <input type="number" v-model="product.price" id="price"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="picture" class="block text-sm font-medium text-gray-700">Gambar Produk</label>
                <input type="file" @change="handleFileUpload" id="picture"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div class="flex justify-between">
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Tambah
                    Produk</button>

                <button @click="goBack"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Home</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/store';
import { useCatgStore } from '~/stores/catego';

const product = ref({
    category_id: '',
    name: '',
    price: '',
    picture: null,
});

const router = useRouter();
const authStore = useAuthStore();
const catgStore = useCatgStore();

const goBack = () => {
    router.push('/edit/');
};

onMounted(async () => {
    await catgStore.fetchCategories(); // Ambil daftar kategori saat komponen dimuat
});

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    product.value.picture = file;
};

const addProduct = async () => {
    const success = await authStore.addProduct(product.value);
    if (success) {
        alert('Product added successfully');
        router.push('/'); // Redirect 
    } else {
        alert('Failed to add product');
    }
};
</script>
