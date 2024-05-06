<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Products</h1>

    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/store';

const auth = useAuthStore();


onMounted(() => {
    auth.fetchProducts();
});
</script>
