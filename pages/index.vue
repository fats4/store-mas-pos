<template>
    <div class="container mx-auto py-8 px-6">
        <nav class="fixed top-0 left-0 right-0  flex item-center justify-between mb-12 bg-white shadow-md py-3 px-4">
            <h1 class="text-2xl font-bold">Products</h1>
            <div class="flex gap-3">
                <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
                <button @click="goToProfile" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Profile</button>
                <button @click="toggleCart" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                    Cart ({{ cartItems.length }})
                </button>
            </div>
        </nav>
        <div class="flex flex-row flex-wrap gap-4 items-center justify-center mt-16">
            <!-- Loop through each product in the array -->
            <div v-for="(product) in auth.list" :key="product.id" class="bg-white shadow-md border border-blue-500 rounded-lg p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                <img :src="product.picture_url" alt="Product Image" class="w-full h-40 object-cover mb-4 cursor-pointer" @click="showProductDetails(product)">
                <h2 class="text-lg font-bold mb-2">{{ product.name }}</h2>
                <p class="text-gray-500 mb-2">Name: {{ product.name }}</p>
                <p class="text-gray-500 mb-2">Price: Rp {{ product.price }}</p>
                <button @click="addToCart(product)" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
            </div>
        </div>
        <div v-if="showCart" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-4 rounded-lg">
                <h2 class="text-lg font-bold mb-4">Cart</h2>
                <ul>
                    <li v-for="(item, index) in cartItems" :key="index" class="mb-2">
                        <div class="flex items-center">
                            <img :src="item.picture_url" alt="Product Image" class="w-10 h-10 object-cover mr-2">
                            <span>{{ item.name }}</span>
                            <div class="flex items-center ml-auto">
                                <button @click="decreaseCartItemQuantity(item)" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">-</button>
                                <span class="mx-2">{{ getCartItemQuantity(item) }}</span>
                                <button @click="increaseCartItemQuantity(item)" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">+</button>
                                <button @click="removeFromCart(item)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
                            </div>
                            <p class="text-gray-500 ml-4">Price: Rp {{ calculateItemPrice(item) }}</p>
                        </div>
                    </li>
                </ul>
                <p class="text-lg font-bold mt-4">Total Price: Rp {{ calculateTotalPrice() }}</p>
                <button @click="toggleCart" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
            </div>
        </div>
        <div v-if="showProductPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-4 rounded-lg">
                <h2 class="text-lg font-bold mb-4">{{ selectedProduct.name }}</h2>
                <img :src="selectedProduct.picture_url" alt="Product Image" class="w-full h-40 object-cover mb-4">
                <p class="text-gray-500 mb-2">Name: {{ selectedProduct.name }}</p>
                <p class="text-gray-500 mb-2">Price: Rp {{ selectedProduct.price }}</p>
                <button @click="addToCart(selectedProduct)" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
                <button @click="closeProductPopup" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store';

const auth = useAuthStore();
const router = useRouter();
const cartItems = ref([]);
const showCart = ref(false);
const showProductPopup = ref(false);
const selectedProduct = ref(null);

onMounted(() => {
    auth.fetchProducts();
});

const logout = () => {
    auth.logout();
    router.push('/authen/');
};

const goToProfile = () => {
    router.push('/user');
};

const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.value.push({ ...product, quantity: 1 });
    }
};

const decreaseCartItemQuantity = (item) => {
    if (item.quantity > 1) {
        item.quantity--;
    }
};

const increaseCartItemQuantity = (item) => {
    item.quantity++;
};

const getCartItemQuantity = (item) => {
    return item.quantity;
};

const calculateItemPrice = (item) => {
    return item.price * item.quantity;
};

const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.value.forEach(item => {
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

const removeFromCart = (item) => {
    const index = cartItems.value.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
        cartItems.value.splice(index, 1);
    }
};
</script>