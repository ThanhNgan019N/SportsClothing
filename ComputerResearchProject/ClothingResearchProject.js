// script.js
const slides = document.querySelector('.slides');
let index = 0;

function showNextSlide() {
    index = (index + 1) % 3; // Số lượng slide
    slides.style.transform = `translateX(-${index * 100}%)`;
}

let autoSlide = setInterval(showNextSlide, 3000); // Chuyển slide mỗi 3 giây


// Tạm dừng khi hover
slides.addEventListener('mouseenter', () => clearInterval(autoSlide));
slides.addEventListener('mouseleave', () => autoSlide = setInterval(showNextSlide, 3000));

const productForm = document.getElementById('product-form');
        const productTable = document.getElementById('product-table').querySelector('tbody');
        const salesForm = document.getElementById('sales-form');
        const predictionResult = document.getElementById('prediction-result');

        let products = [];
        let nextId = 1;

        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const price = parseFloat(e.target.price.value);
            const quantity = parseInt(e.target.quantity.value, 10);

            products.push({ id: nextId++, name, price, quantity });
            updateProductTable();
            e.target.reset();
        });

        function updateProductTable() {
            productTable.innerHTML = '';
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>${product.quantity}</td>
                    <td><button onclick="deleteProduct(${product.id})">Delete</button></td>
                `;
                productTable.appendChild(row);
            });
        }

        function deleteProduct(id) {
            products = products.filter(product => product.id !== id);
            updateProductTable();
        }

        salesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const month = parseInt(e.target.month.value, 10);
            const year = parseInt(e.target.year.value, 10);

            // Dummy AI Prediction Logic
            const prediction = (Math.random() * 1000).toFixed(2);
            predictionResult.textContent = `Prediction: ${prediction}`;
        });