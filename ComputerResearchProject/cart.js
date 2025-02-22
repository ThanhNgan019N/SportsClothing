document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("cart-total");

    function renderCart() {
        if (!cartTable) return;

        cartTable.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.image}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()}đ</td>
                <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
                <td>${item.size}</td> 
                
                <td><button onclick="removeFromCart(${index})">Delete</button></td>
            `;
            cartTable.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toLocaleString() + "đ";
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    window.addToCart = function (name, price, image, size) {
        let existingItem = cartItems.find(item => item.name === name && item.size === size);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ name, price: parseInt(price), image, size, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cartItems));
        alert("Product has been added to cart!");
        renderCart(); 
    };

    window.buyNow = function (name, price, image, size) {
        cartItems = [{ name, price, image, size, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(cartItems));
        window.location.href = "cart.html";
    };

    window.updateQuantity = function (index, quantity) {
        cartItems[index].quantity = parseInt(quantity);
        renderCart();
    };

    window.removeFromCart = function (index) {
        cartItems.splice(index, 1);
        renderCart();
    };

    window.checkout = function () {
        window.location.href = "Pay.html";
    };

    renderCart();
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pay-button").addEventListener("click", function () {
        window.location.href = "Pay.html";
    });
});