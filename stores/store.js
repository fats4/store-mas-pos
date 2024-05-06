import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        email: '',
        password: '',
        isLoggedIn: false,
        token: '',
    }),
    actions: {
        async login() {
            const router = useRouter();

            try {
            const response = await fetch('https://mas-pos.appmedia.id/api/v1/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                email: this.email,
                password: this.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('loginData', JSON.stringify(data));
                console.log('Login data:', data);

                this.isLoggedIn = true;
                this.token = data.token;
                router.push('/product');
            } else {
                console.error('Login failed');
                alert('Login failed');
            }
            } catch (error) {
            console.error('An error occurred:', error);
            }
        },
        async fetchProducts() {
            try {
            const response = await fetch('https://mas-pos.appmedia.id/api/v1/product', {
                method: 'GET',
                headers: {
                Authorization: `Bearer ${this.token}`,
                },
            });
    
            if (response.ok) {
                const products = await response.json();
                console.log('Products:', products);

            } else {
                console.error('Failed to fetch products');
            }
            } catch (error) {
            console.error('An error occurred while fetching products:', error);
            }
        },
    },
});
