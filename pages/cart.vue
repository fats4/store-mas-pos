<template>
    <div class="container mx-auto py-8 px-6">
        <h1 class="text-2xl font-bold mb-4">Keranjang</h1>
        <ul>
            <li v-for="(item, index) in cartItems" :key="index" class="mb-2">
                <div class="flex space-x-3 justify-between items-center">
                    <img :src="item.picture_url" alt="Product Image" class="w-10 h-10 object-cover mr-2">
                    <div class="flex flex-col">
                        <span class="font-bold">{{ item.name }}</span>
                        <span class="text-gray-500">Harga: Rp {{ calculateItemPrice(item) }}</span>
                    </div>
                    <div class="flex items-center ml-auto">
                        <span class="mx-2">{{ getCartItemQuantity(item) }}</span>
                    </div>
                </div>
            </li>
        </ul>
        <p class="text-lg font-bold mt-4">Total Harga: Rp {{ calculateTotalPrice() }}</p>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store';

const auth = useAuthStore();

const cartItems = ref([]);

onMounted(() => {
    cartItems.value = auth.getCartItems();
});

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
</script>
