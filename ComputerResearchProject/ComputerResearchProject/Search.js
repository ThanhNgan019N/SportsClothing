function searchProducts(event) {
    event.preventDefault(); // Ngăn không cho form reload trang

    let keyword = document.getElementById("searchInput").value.toLowerCase(); // Lấy từ khóa tìm kiếm
    let products = document.querySelectorAll(".product"); // Lấy tất cả sản phẩm

    products.forEach(product => {
        let productName = product.querySelector("h2").innerText.toLowerCase(); // Lấy tên sản phẩm

        if (productName.includes(keyword)) {
            product.style.display = "block"; // Hiển thị nếu khớp từ khóa
        } else {
            product.style.display = "none"; // Ẩn nếu không khớp
        }
    });
}

function liveSearch() {
    let keyword = document.getElementById("searchInput").value.toLowerCase();
    let products = document.querySelectorAll(".product");
    let count = 0;

    products.forEach(product => {
        let productName = product.querySelector("h2").innerText.toLowerCase();

        if (productName.includes(keyword)) {
            product.style.display = "block";
            count++;
        } else {
            product.style.display = "none";
        }
    });

    document.getElementById("resultCount").innerText = count > 0 ? `🔍 Tìm thấy ${count} kết quả` : "❌ Không tìm thấy sản phẩm!";
}