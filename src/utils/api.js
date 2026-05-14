const API_BASE = 'https://fakeapi.net';

export async function fetchProducts(categories = [], page = 1, limit = 10, search = '') {
    try {
        let url = `${API_BASE}/products?page=${page}&limit=${limit}`;

        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        if (categories && categories.length > 0) {
            const categoryParam = categories.join(',');
            url += `&category=${categoryParam}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        return {
            products: result.data || [],
            pagination: result.pagination || { page: 1, limit: 10, total: 0 }
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            products: [],
            pagination: { page: 1, limit: 10, total: 0 }
        };
    }
}

export async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_BASE}/products/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE}/products/categories`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}
