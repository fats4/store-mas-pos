import { defineStore } from 'pinia';

export const useTempStore = defineStore({
    id: 'temp',
    state: () => ({
        cartItems: [],
    }),
    actions: {
        addToCart(product) {
            const existingItem = this.cartItems.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cartItems.push({ ...product, quantity: 1 });
            }
        },
        getCartItems() {
            return this.cartItems;
        },
    },
});



