document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("checkout-items");
    let totalPriceElement = document.getElementById("checkout-total");

    function renderCheckout() {
        if (!cartTable) return;

        cartTable.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.image}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()}đ</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" 
                        data-index="${index}" class="quantity-input">
                </td>
              
            `;
            cartTable.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toLocaleString() + "đ";

        // Lắng nghe sự kiện thay đổi số lượng
        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("input", function () {
                let index = this.getAttribute("data-index");
                cartItems[index].quantity = parseInt(this.value) || 1;
                localStorage.setItem("cart", JSON.stringify(cartItems));
                renderCheckout();
            });
        });
    }

    renderCheckout();
});

// Xử lý thanh toán
document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let paymentMethod = document.querySelector('input[name="payment"]:checked');
    
    if (!paymentMethod) {
        alert("Vui lòng chọn phương thức thanh toán!");
        return;
    }

    let selectedMethod = paymentMethod.value;

    if (selectedMethod === "momo") {
        alert("Chuyển hướng đến MoMo...");
        window.location.href = "https://momo.vn";
    } else if (selectedMethod === "vnpay") {
        alert("Chuyển hướng đến VNPay...");
        window.location.href = "https://vnpay.vn";
    } else {
        alert("Đơn hàng đã được xác nhận! Thanh toán khi nhận hàng.");
    }

    // Xóa giỏ hàng sau khi thanh toán thành công
    setTimeout(() => {
        localStorage.removeItem("cart");
    }, 2000); // Tránh xóa ngay lập tức để tránh mất dữ liệu khi redirect
});
document.getElementById("pay-button").addEventListener("click", function () {
    window.location.href = "Pay.html";
});
