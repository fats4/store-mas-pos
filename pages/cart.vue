<template>
    <div class="container mx-auto py-8 px-6">
        <h1 class="text-2xl font-bold mb-4">Keranjang</h1>
        <ul>
            <li v-for="(item, index) in cartItems" :key="index" class="mb-2">
                <div class="flex space-x-3 justify-between items-center">
                    <img :src="item.picture_url" alt="Product Image" class="w-10 h-10 object-cover mr-2">
                    <div class="flex flex-col">
                        <span class="font-bold">{{ item.name }}</span>
                        <span class="text-gray-500">Harga: {{ formatRupiah(calculateItemPrice(item)) }}</span>
                    </div>
                    <div class="flex items-center ml-auto">
                        <button @click="decreaseQuantity(item)"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">-</button>
                        <span class="mx-2">{{ getCartItemQuantity(item) }}</span>
                        <button @click="increaseQuantity(item)"
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded">+</button>
                        <button @click="removeFromCart(item)"
                            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded ml-2">Remove</button>
                    </div>
                </div>
            </li>
        </ul>
        <p class="text-lg font-bold mt-4 text-right">Total Harga: {{ formatRupiah(calculateTotalPrice()) }}</p>
        <div class="flex justify-between">
            <button @click="goToHome"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Back</button>
            <button @click="openPaymentModal"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Bayar</button>
        </div>

        <!-- Modal Pembayaran -->
        <div v-if="isPaymentModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div class="bg-white p-8 rounded shadow-lg max-w-md w-full">
                <h2 class="text-xl font-bold mb-4">Pembayaran</h2>
                <p>Total Harga: {{ formatRupiah(calculateTotalPrice()) }}</p>
                <button @click="confirmPayment"
                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Konfirmasi
                    Pembayaran</button>
                <button @click="closePaymentModal"
                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">Batal</button>
            </div>
        </div>

        <!-- Nota Pembayaran -->
        <div v-if="isReceiptVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div class="bg-white p-8 rounded shadow-lg max-w-md w-full">
                <h2 class="text-xl font-bold mb-4">Nota Pembayaran</h2>
                <ul>
                    <li v-for="(item, index) in cartItems" :key="index" class="mb-2">
                        <div class="flex justify-between">
                            <span class="font-bold">{{ item.name }}</span>
                            <span class="text-gray-500"> {{ formatRupiah(calculateItemPrice(item)) }}</span>
                        </div>
                    </li>
                </ul>
                <p class="text-lg font-bold mt-4">Total Harga: {{ formatRupiah(calculateTotalPrice()) }}</p>
                <button @click="printReceipt"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Cetak Nota</button>
                <button @click="closeReceipt"
                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">Tutup</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store';
import { formatRupiah } from '~/utils/formatRp';

const auth = useAuthStore();
const router = useRouter();

const cartItems = ref([]);
const isPaymentModalOpen = ref(false);
const isReceiptVisible = ref(false);

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

const goToHome = () => {
    router.push('/');
};

const openPaymentModal = () => {
    isPaymentModalOpen.value = true;
};

const closePaymentModal = () => {
    isPaymentModalOpen.value = false;
};

const confirmPayment = () => {
    isPaymentModalOpen.value = false;
    isReceiptVisible.value = true;
};

const closeReceipt = () => {
    isReceiptVisible.value = false;
    router.push('/');
};

const printReceipt = () => {
    window.print();
};

const increaseQuantity = (item) => {
    auth.increaseCartItemQuantity(item);
    cartItems.value = auth.getCartItems();
};

const decreaseQuantity = (item) => {
    auth.decreaseCartItemQuantity(item);
    cartItems.value = auth.getCartItems();
};

const removeFromCart = (item) => {
    auth.removeCartItem(item);
    cartItems.value = auth.getCartItems();
};
</script>
