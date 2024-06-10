<template>
    <div class="container mx-auto py-8 px-6">
        <h1 class="text-2xl font-bold mb-4">Edit Kategori</h1>
        <div v-if="selectedCategory">
            <form @submit.prevent="updateCategory">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Nama Kategori</label>
                    <input type="text" v-model="selectedCategory.name" id="name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update
                    Kategori</button>

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
import { useRouter, useRoute } from 'vue-router';
import { useCatgStore } from '~/stores/catego';

const catgStore = useCatgStore();
const router = useRouter();
const route = useRoute();

const selectedCategory = computed(() => catgStore.selectedCategory);

const goBack = () => {
    router.push('/category/');
};

onMounted(async () => {
    const categoryId = route.params.id;
    await catgStore.fetchCategory(categoryId);
});

const updateCategory = async () => {
    const success = await catgStore.updateCategory(selectedCategory.value);
    if (success) {
        alert('Category updated successfully');
        router.push('/category/');
    } else {
        alert('Failed to update category');
    }
};
</script>