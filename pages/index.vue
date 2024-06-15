<template>
    <div class="container mx-auto py-8 flex">
        <!-- Sidebar -->
        <div class="w-1/12 px-2 fixed top-0 left-0 h-full bg-white shadow-md flex flex-col items-center justify-center">
            <h2 class="text-lg font-bold mb-4 mt-20">Category</h2>
            <ul class="flex flex-col items-center">
                <li v-for="category in filteredCategories" :key="category.id" class="mb-2">
                    <button @click="filterByCategory(category.id)" class="text-blue-500 hover:underline">{{
                        category.name }}</button>
                </li>
                <li>
                    <button @click="filterByCategory(null)" class="text-blue-500 hover:underline">All
                    </button>
                </li>
            </ul>
        </div>


        <!-- Main Content -->
        <div class="w-11/12 ml-[10%]">
            <nav
                class="fixed top-0 left-0 right-0 flex items-center justify-between mb-12 bg-white shadow-md py-3 px-24">
                <img src="/assets/logo.jpeg" @click="goHome" alt="Logo" class="w-12 h-12 rounded-full cursor-pointer">
                <div class="flex gap-3">
                    <button @click="logout"
                        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
                    <button @click="goToEdit"
                        class="bg-green-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Edit</button>
                    <div class="relative inline-block">
                        <button @click="toggleCart"
                            class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex">
                            Cart ({{ auth.cartItems.length }})
                        </button>
                        <div v-if="showCart" class="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-max">
                            <ul class="px-4">
                                <li v-for="(item, index) in auth.cartItems" :key="index" class="mb-2">
                                    <div class="flex space-x-3 justify-between items-center">
                                        <img :src="item.picture_url" alt="Product Image"
                                            class="w-10 h-10 object-cover mr-2">
                                        <div class="flex flex-col">
                                            <span class="font-bold">{{ item.name }}</span>
                                            <span class="text-gray-500">Harga: {{
                                                formatRupiah(calculateItemPrice(item)) }}</span>
                                        </div>
                                        <div class="flex items-center ml-auto">
                                            <span class="mx-2">x{{ getCartItemQuantity(item) }}</span>
                                        </div>
                                    </div>
                                </li>
                                <p class="text-lg font-bold mt-4">Total Harga: {{ formatRupiah(calculateTotalPrice())
                                    }}</p>
                                <div class="flex mt-4 mb-3 justify-between">
                                    <button @click="toggleCart"
                                        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Close</button>
                                    <button @click="goToCart"
                                        class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Cart</button>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <img src="/assets/vaz.jpeg" @click="goToProfile" alt="Logo"
                        class="w-10 h-10 rounded-full cursor-pointer">
                </div>
            </nav>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center justify-center mt-16">
                <div v-for="(product) in filteredProducts" :key="product.id"
                    class="bg-white shadow-md border border-blue-500 rounded-lg p-4">
                    <img :src="product.picture_url" alt="Product Image"
                        class="w-full h-40 object-cover mb-4 cursor-pointer" @click="showProductDetails(product)">
                    <h2 class="text-lg font-bold mb-2">{{ product.name }}</h2>
                    <p class="text-gray-500 mb-2">Nama: {{ product.name }}</p>
                    <p class="text-gray-500 mb-2">Harga: {{ formatRupiah(product.price) }}</p>
                    <button @click="addToCart(product)"
                        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add</button>
                </div>
            </div>
            <div v-if="showProductPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white p-4 rounded-lg">
                    <h2 class="text-lg font-bold mb-4">{{ selectedProduct.name }}</h2>
                    <img :src="selectedProduct.picture_url" alt="Product Image" class="w-full h-40 object-cover mb-4">
                    <p class="text-gray-500 mb-2">Nama: {{ selectedProduct.name }}</p>
                    <p class="text-gray-500 mb-2">Harga: Rp {{ formatRupiah(selectedProduct.price) }}</p>
                    <div class="flex flex-1 justify-between">
                        <button @click="addToCart(selectedProduct)"
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add</button>
                        <button @click="closeProductPopup"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/store';
import { formatRupiah } from '~/utils/formatRp';


const auth = useAuthStore();
const router = useRouter();
const showCart = ref(false);
const showProductPopup = ref(false);
const selectedProduct = ref(null);
const selectedCategory = ref(null);

onMounted(async () => {
    await auth.fetchProducts();
    await auth.fetchCategories();
});

const logout = () => {
    auth.logout();
    router.push('/authen/');
};

const goHome = () => {
    router.push('/');
};

const goToProfile = () => {
    router.push('/user');
};

const goToCart = () => {
    router.push('/cart');
};

const goFbase = () => {
    router.push('/firebs/');
};

const goToEdit = () => {
    router.push('/edit/');
};

const addToCart = (product) => {
    auth.addToCart(product);
};

const getCartItemQuantity = (item) => {
    return item.quantity;
};

const calculateItemPrice = (item) => {
    return item.price * item.quantity;
};

const calculateTotalPrice = () => {
    let totalPrice = 0;
    auth.cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    return totalPrice;
};

const toggleCart = () => {
    showCart.value = !showCart.value;
};

const showProductDetails = (product) => {
    selectedProduct.value = product;
    showProductPopup.value = true;
};

const closeProductPopup = () => {
    showProductPopup.value = false;
};

const filterByCategory = (categoryId) => {
    selectedCategory.value = categoryId;
};

const filteredCategories = computed(() => {
    return auth.categories.filter(category => category.name === 'Makanan' || category.name === 'Minuman');
});

const filteredProducts = computed(() => {
    if (selectedCategory.value === null) {
        return auth.list.filter(product =>
            auth.categories.some(category =>
                (category.name === 'Makanan' || category.name === 'Minuman') && category.id === product.category_id
            )
        );
    } else {
        return auth.list.filter(product => product.category_id === selectedCategory.value);
    }
});
</script>

<style scoped>
.container {
    display: flex;
}
</style>
