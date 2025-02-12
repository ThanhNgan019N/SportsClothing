document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function addToCart(productName, price, image) {
        const existingProduct = cart.find((item) => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: price, image: image, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart successfully!");
    }

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            const name = product.querySelector("h2").textContent;
            const price = product.querySelector(".price").textContent;
            const image = product.querySelector("img").src;
            addToCart(name, price, image);
        });
    });

    document.querySelectorAll(".buy-now").forEach((button) => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            const name = product.querySelector("h2").textContent;
            const price = product.querySelector(".price").textContent;
            const image = product.querySelector("img").src;
            addToCart(name, price, image);
            window.location.href = "cart.html";
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function addToCart(product) {
        let index = cart.findIndex(item => item.name === product.name);
        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                name: this.getAttribute("data-name"),
                price: parseInt(this.getAttribute("data-price")),
                image: this.getAttribute("data-image")
            };

            addToCart(product);

            // Chuyển hướng đến cart.html sau khi thêm vào giỏ hàng
            window.location.href = "cart.html";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Thêm sản phẩm vào giỏ hàng
    function addToCart(product) {
        let index = cart.findIndex(item => item.name === product.name);
        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng!");
    }

    // Xử lý sự kiện click "Buy Now"
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                name: this.getAttribute("data-name"),
                price: parseInt(this.getAttribute("data-price")),
                image: this.getAttribute("data-image")
            };
            addToCart(product);
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItems.innerHTML += `
                <tr>
                    <td><img src="${item.image}" width="50"></td>
                    <td>${item.name}</td>
                    <td>${item.price.toLocaleString()}đ</td>
                    <td>${item.quantity}</td>
                    <td><button class="remove-item" data-index="${index}">Xóa</button></td>
                </tr>
            `;
        });

        totalPrice.textContent = `Tổng: ${total.toLocaleString()}đ`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });

    document.getElementById("clear-cart").addEventListener("click", function () {
        localStorage.removeItem("cart");
        location.reload();
    });

    renderCart();
});
