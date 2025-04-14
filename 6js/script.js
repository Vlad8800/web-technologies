// script.js
const createProductCard = (product) => {
    const li = document.createElement('li');
    li.className = 'product-card';
    li.dataset.id = product.id;
    li.innerHTML = `
        <div>ID: ${product.id}</div>
        <div>Назва: ${product.name}</div>
        <div>Ціна: ${product.price} грн</div>
        <div>Категорія: ${product.category}</div>
        <img src="${product.image}" alt="${product.name}">
        <button class="delete-btn">Видалити</button>
        <button class="edit-btn">Редагувати</button>
    `;
    return li;
};

const showToast = (message) => {
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
};

const calculateTotalCost = (products) => 
    products.reduce((sum, product) => sum + Number(product.price), 0);

const renderProducts = (products) => {
    const list = document.querySelector('.products-list');
    list.innerHTML = '';
    if (products.length === 0) {
        list.innerHTML = '<li>Наразі список товарів пустий. Додайте новий товар.</li>';
    } else {
        products.forEach(product => list.appendChild(createProductCard(product)));
    }
    document.querySelector('.total-cost span').textContent = calculateTotalCost(products);
};

const getCategories = (products) => [...new Set(products.map(p => p.category))];

const renderFilters = (products) => {
    const filterButtons = document.querySelector('.filter-buttons');
    filterButtons.innerHTML = '';
    getCategories(products).forEach(category => {
        const btn = document.createElement('button');
        btn.textContent = category;
        btn.addEventListener('click', () => filterProducts(products, category));
        filterButtons.appendChild(btn);
    });
};

let products = [];
let editingId = null;

document.querySelector('.add-product').addEventListener('click', () => {
    editingId = null;
    document.querySelector('.modal').classList.remove('hidden');
    document.querySelector('.product-form').reset();
});

document.querySelector('.product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = {
        id: editingId || Date.now().toString(),
        name: formData.get('name'),
        price: Number(formData.get('price')),
        category: formData.get('category'),
        image: formData.get('image'),
        created: editingId ? products.find(p => p.id === editingId).created : new Date(),
        updated: new Date()
    };

    if (editingId) {
        products = products.map(p => p.id === editingId ? product : p);
        showToast(`Товар ${product.id} (${product.name}) успішно оновлено`);
    } else {
        products = [...products, product];
    }

    renderProducts(products);
    renderFilters(products);
    document.querySelector('.modal').classList.add('hidden');
});

document.querySelector('.products-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.parentElement.dataset.id;
        const card = e.target.parentElement;
        card.style.animation = 'fadeOut 0.3s ease-out';
        card.addEventListener('animationend', () => {
            products = products.filter(p => p.id !== id);
            renderProducts(products);
            renderFilters(products);
            showToast(`Товар ${id} успішно видалено`);
        });
    }
    if (e.target.classList.contains('edit-btn')) {
        editingId = e.target.parentElement.dataset.id;
        const product = products.find(p => p.id === editingId);
        document.querySelector('.modal').classList.remove('hidden');
        const form = document.querySelector('.product-form');
        form.name.value = product.name;
        form.price.value = product.price;
        form.category.value = product.category;
        form.image.value = product.image;
    }
});

const filterProducts = (products, category) => 
    renderProducts(products.filter(p => p.category === category));

document.querySelector('.reset-filter').addEventListener('click', () => 
    renderProducts(products));

const sortBy = (products, key) => [...products].sort((a, b) => 
    key === 'price' ? a[key] - b[key] : new Date(a[key]) - new Date(b[key]));

document.querySelector('.sort-price').addEventListener('click', () => 
    renderProducts(sortBy(products, 'price')));
document.querySelector('.sort-created').addEventListener('click', () => 
    renderProducts(sortBy(products, 'created')));
document.querySelector('.sort-updated').addEventListener('click', () => 
    renderProducts(sortBy(products, 'updated')));
document.querySelector('.reset-sort').addEventListener('click', () => 
    renderProducts(products));

renderProducts(products);
renderFilters(products);

