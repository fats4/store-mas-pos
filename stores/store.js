import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        email: '',
        password: '',
        isLoggedIn: false,
        token: '',
        list: [],
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
                    this.token = data.data.token;
                    router.push('/product');

                } else {
                    console.error('Login failed');
                    alert('Login failed');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },

        async logout() {
            sessionStorage.removeItem('loginData');
            this.isLoggedIn = false;
            this.token = '';
            this.email = '';
            this.password = '';
            console.log(this.token)
        },

        async fetchProducts() {
            try {
                console.log('Token:', this.token);

                const response = await fetch('https://mas-pos.appmedia.id/api/v1/product', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                if (response.ok) {
                    const products = await response.json();
                    console.log(products)

                    this.list = products.data; // Store the fetched products in the state
                    console.log(this.list);

                } else {
                    console.error('Failed to fetch products');
                    console.log('Token:', this.token);
                    alert('Tolong login');
                }
            } catch (error) {
                console.error('An error occurred while fetching products:', error);
            }
        },
    },
});
