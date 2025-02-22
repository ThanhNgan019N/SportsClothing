document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector("button.btn-primary");

    loginButton.addEventListener("click", function () {
        const email = document.getElementById("inputEmail3").value.trim();
        const password = document.getElementById("inputPassword").value.trim();

        // Kiểm tra điều kiện hợp lệ
        if (!email || !password) {
            alert("Vui lòng nhập email và mật khẩu!");
            return;
        }

        // Dữ liệu đăng nhập
        const loginData = {
            email,
            password
        };

        // Chọn API backend (giả lập hoặc thật)
        const useFakeAPI = true; // Đổi thành false nếu bạn có backend thật
        const apiURL = useFakeAPI
            ? "https://jsonplaceholder.typicode.com/posts" // API giả lập
            : "https://your-backend.com/api/login"; // API thật của bạn

        // Gửi dữ liệu bằng fetch
        fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Phản hồi từ server:", data);

                // Giả lập xác thực thành công
                if (useFakeAPI || data.success) {
                    alert("Đăng nhập thành công!");
                    localStorage.setItem("userToken", data.token || "fake-token"); // Lưu token giả lập
                    window.location.href = "ClothingResearchProject.html"; // Chuyển hướng sau khi đăng nhập
                } else {
                    alert("Sai email hoặc mật khẩu!");
                }
            })
            .catch(error => {
                console.error("Lỗi:", error);
                alert("Đăng nhập thất bại! Vui lòng thử lại.");
            });
    });
});
app.use(express.static(__dirname + "/public"));


