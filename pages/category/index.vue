<template>
    <div class="container mx-auto py-8 px-6">
        <h1 class="text-2xl font-bold mb-4">Daftar Kategori</h1>
        <button @click="goToHome"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Home</button>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="category in catgStore.categories" :key="category.id" class="bg-white shadow-md rounded-lg p-4">
                <h2 class="text-lg font-bold mb-2">{{ category.name }}</h2>
                <button @click="editCategory(category.id)"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Edit</button>
                <button @click="deleteCategory(category.id)"
                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCatgStore } from '~/stores/catego';

const catgStore = useCatgStore();
const router = useRouter();

const goToHome = () => {
    router.push('/edit/');
};

onMounted(async () => {
    await catgStore.fetchCategories();
});

const editCategory = (categoryId) => {
    router.push(`/category/${categoryId}`);
};

const deleteCategory = async (categoryId) => {
    const confirmed = confirm('Are you sure you want to delete this category?');
    if (confirmed) {
        const success = await catgStore.deleteCategory(categoryId);
        if (success) {
            alert('Category deleted successfully');
        } else {
            alert('Failed to delete category');
        }
    }
};
</script>
