import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        email: '',
        password: '',
        isLoggedIn: false,
        token: '',
        list: [],
        profile: [],
        cartItems: [],
        selectedProduct: null,
        categories: [],
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
                    router.push('/');

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
                const router = useRouter();

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
                    router.push('/authen/');
                }
            } catch (error) {
                console.error('An error occurred while fetching products:', error);
            }
        },

        async fetchProfile() {
            try {
                const response = await fetch('https://mas-pos.appmedia.id/api/v1/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.token}`,
                    },
                    body: JSON.stringify({
                        // Add any request body parameters here
                    }),
                });

                if (response.ok) {
                    const profiled = await response.json();
                    // Store the fetched profile in the state
                    this.profile = profiled.data; // Assuming you have a 'profile' property in the state
                    console.log(profiled);
                } else {
                    console.error('Failed to fetch profile');
                    console.log('Token:', this.token);
                    alert('Failed to fetch profile');
                }
            } catch (error) {
                console.error('An error occurred while fetching profile:', error);
            }
        },

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

        async fetchProduct(productId) {
            try {
                const response = await fetch(`https://mas-pos.appmedia.id/api/v1/product/${productId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    this.selectedProduct = data.data;
                } else {
                    console.error('Failed to fetch product');
                }
            } catch (error) {
                console.error('An error occurred while fetching product:', error);
            }
        },

        async updateProduct(product) {
            try {
                // Create a new FormData instance
                const formData = new FormData();
                formData.append('category_id', product.category_id);
                formData.append('name', product.name);
                formData.append('price', product.price);
                if (product.picture) {
                    formData.append('picture', product.picture);
                }

                const response = await fetch(`https://mas-pos.appmedia.id/api/v1/product/update/${product.id}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        // 'Content-Type': 'multipart/form-data' // Do not set this header manually, let the browser set it
                    },
                    body: formData,
                });

                if (response.ok) {
                    const updatedProduct = await response.json();
                    const index = this.list.findIndex(p => p.id === product.id);
                    if (index !== -1) {
                        this.list[index] = updatedProduct.data;
                    } else {
                        this.list.push(updatedProduct.data);
                    }
                    this.selectedProduct = updatedProduct.data;
                    await this.fetchProducts(); // Refresh the products list
                    return true;
                } else {
                    const errorResponse = await response.json();
                    console.error('Failed to update product:', errorResponse);
                    return false;
                }
            } catch (error) {
                console.error('An error occurred while updating product:', error);
                return false;
            }
        },

        async deleteProduct(productId) {
            try {
                const response = await fetch(`https://mas-pos.appmedia.id/api/v1/product/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                if (response.ok) {
                    this.list = this.list.filter(p => p.id !== productId);
                    return true;
                } else {
                    const errorResponse = await response.json();
                    console.error('Failed to delete product:', errorResponse);
                    return false;
                }
            } catch (error) {
                console.error('An error occurred while deleting product:', error);
                return false;
            }
        },

        async addProduct(product) {
            try {
                const formData = new FormData();
                formData.append('category_id', product.category_id);
                formData.append('name', product.name);
                formData.append('price', product.price);
                if (product.picture) {
                    formData.append('picture', product.picture);
                }

                const response = await fetch('https://mas-pos.appmedia.id/api/v1/product', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const newProduct = await response.json();
                    this.list.push(newProduct.data);
                    return true;
                } else {
                    const errorResponse = await response.json();
                    console.error('Failed to add product:', errorResponse);
                    return false;
                }
            } catch (error) {
                console.error('An error occurred while adding product:', error);
                return false;
            }
        },

        async fetchCategories() {
            try {
                const response = await fetch('https://mas-pos.appmedia.id/api/v1/category', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                if (response.ok) {
                    const categories = await response.json();
                    this.categories = categories.data;
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('An error occurred while fetching categories:', error);
            }
        },


    },
});
