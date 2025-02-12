const form = document.getElementById('registration-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');

form.addEventListener('submit', (event) => {
  let errorMessage = false;

  // Username validation (replace with your desired logic)
  if (usernameInput.value.length < 6) {
    usernameError.textContent = 'Username must be at least 6 characters long.';
    errorMessage = true;
  } else {
    usernameError.textContent = '';
  }

  // Email validation (basic check)
  if (!emailInput.value.includes('@')) {
    emailError.textContent = 'Please enter a valid email address.';
    errorMessage = true;
  } else {
    emailError.textContent = '';
  }

  // Password validation (replace with your desired logic)
  if (passwordInput.value.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters long.';
    errorMessage = true;
  } else {
    passwordError.textContent = '';
  }

  // Confirm password validation
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    errorMessage = true;
  } else {
    confirmPasswordError.textContent = '';
  }

  if (errorMessage) {
    event.preventDefault(); // Prevent form submission if errors exist
  }
});


  document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.querySelector("button.btn-primary");

    registerButton.addEventListener("click", function () {
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("inputEmail3").value.trim();
        const password = document.getElementById("inputPassword").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        // Kiểm tra điều kiện hợp lệ
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        // Dữ liệu đăng ký
        const userData = {
            firstName,
            lastName,
            email,
            password
        };

        // Chọn API backend (giả lập hoặc thật)
        const useFakeAPI = true; // Đổi thành false nếu bạn có backend thật
        const apiURL = useFakeAPI
            ? "https://jsonplaceholder.typicode.com/posts" // API giả lập
            : "https://your-backend.com/api/register"; // API thật của bạn

        // Gửi dữ liệu bằng fetch
        fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Phản hồi từ server:", data);
                alert("Đăng ký thành công!");
                window.location.href = "login.html"; // Chuyển hướng sau khi đăng ký thành công
            })
            .catch(error => {
                console.error("Lỗi:", error);
                alert("Đăng ký thất bại! Vui lòng thử lại.");
            });
    });
});
