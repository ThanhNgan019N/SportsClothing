// document.addEventListener("DOMContentLoaded", function () {
//     const searchInput = document.querySelector(".form-control");
//     const products = document.querySelectorAll(".product");

//     searchInput.addEventListener("input", function () {
//         const query = searchInput.value.toLowerCase();
//         products.forEach((product) => {
//             const productName = product.querySelector("h2").innerText.toLowerCase();
//             if (productName.includes(query)) {
//                 product.style.display = "block";
//             } else {
//                 product.style.display = "none";
//             }
//         });
//     });
// });
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".form-control");

    searchInput.addEventListener("input", function () {
        fetch(`/search?query=${searchInput.value}`)
            .then((response) => response.json())
            .then((data) => {
                const resultsContainer = document.querySelector(".products");
                resultsContainer.innerHTML = "";
                data.forEach((item) => {
                    resultsContainer.innerHTML += `
                        <div class="product">
                            <img src="${item.image}" alt="${item.name}">
                            <h2>${item.name}</h2>
                            <span class="price">${item.price}đ</span>
                            <button onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">Add to Cart</button>
                            <button onclick="buyNow('${item.name}', ${item.price}, '${item.image}')">Buy</button>
                        </div>
                    `;
                });
            });
    });
});
const express = require("express");
const app = express();
const products = [
    { name: "Áo bóng đá Pro-Hero Vàng Kem", price: 129000, image: "image/PRO-Hero-VangKem.jpg" },
    { name: "Giày đá bóng Puma Ultra", price: 500000, image: "image/puma.jpeg" },
    // ... danh sách sản phẩm khác
];

app.get("/search", (req, res) => {
    const query = req.query.query.toLowerCase();
    const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(query));
    res.json(filteredProducts);
});

app.listen(3000, () => console.log("Server chạy trên cổng 3000"));
function searchProducts(event) {
    event.preventDefault(); // Ngăn chặn load lại trang

    let input = document.getElementById("searchInput").value.toLowerCase();
    let products = document.querySelectorAll(".product-item");

    products.forEach(product => {
        let productName = product.querySelector(".product-name").innerText.toLowerCase();
        if (productName.includes(input)) {
            product.style.display = "block"; // Hiển thị sản phẩm phù hợp
        } else {
            product.style.display = "none"; // Ẩn sản phẩm không khớp
        }
    });
}