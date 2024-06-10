import { defineStore } from 'pinia';
import { useAuthStore } from './store'; // Import the auth store

export const useCatgStore = defineStore({
    id: 'catg',
    state: () => ({
        categories: [],
        selectedCategory: null,
    }),
    actions: {
        async fetchCategories() { // Tambahkan action untuk mengambil kategori
            const authStore = useAuthStore(); // Access the auth store
            const token = authStore.token; // Get the token

            try {
                const response = await fetch('https://mas-pos.appmedia.id/api/v1/category', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.categories = data.data;
                } else {
                    console.error('Failed to fetch categories');
                    this.categories = [];
                }
            } catch (error) {
                console.error('An error occurred while fetching categories:', error);
                this.categories = [];
            }
        },

        async fetchCategory(categoryId) { // Tambahkan action untuk mengambil satu kategori
            const authStore = useAuthStore(); // Access the auth store
            const token = authStore.token; // Get the token

            try {
                const response = await fetch(`https://mas-pos.appmedia.id/api/v1/category/${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.selectedCategory = data.data;
                } else {
                    console.error('Failed to fetch category');
                    this.selectedCategory = null;
                }
            } catch (error) {
                console.error('An error occurred while fetching category:', error);
                this.selectedCategory = null;
            }
        },

        async deleteCategory(categoryId) { // Tambahkan action untuk menghapus kategori
            const authStore = useAuthStore(); // Access the auth store
            const token = authStore.token; // Get the token

            try {
                const response = await fetch(`https://mas-pos.appmedia.id/api/v1/category/${categoryId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    this.categories = this.categories.filter(category => category.id !== categoryId);
                    return true;
                } else {
                    console.error('Failed to delete category');
                    return false;
                }
            } catch (error) {
                console.error('An error occurred while deleting category:', error);
                return false;
            }
        },

        async updateCategory(category) { // Tambahkan action untuk mengedit kategori
            const authStore = useAuthStore(); // Access the auth store
            const token = authStore.token; // Get the token

            try {
                const response = await fetch(`https://mas-pos.appmedia.id/api/v1/category/${category.id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(category),
                });
                if (response.ok) {
                    const updatedCategory = await response.json();
                    const index = this.categories.findIndex(c => c.id === category.id);
                    if (index !== -1) {
                        this.categories[index] = updatedCategory.data;
                    }
                    await this.fetchCategories(); // Refresh the categories list
                    return true;
                } else {
                    const errorResponse = await response.json();
                    console.error('Failed to update category:', errorResponse);
                    return false;
                }
            } catch (error) {
                console.error('An error occurred while updating category:', error);
                return false;
            }
        },
    },
});
