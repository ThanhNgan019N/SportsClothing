document.addEventListener("DOMContentLoaded", function () {
    const buttonConvert = document.getElementById('convert-btn');
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const apiKey = "nhap-gemini-api-tai-day"; // Thay thế bằng API key của bạn
    const model = "gemini-1.5-flash-latest"; // Model bạn muốn sử dụng

    buttonConvert.addEventListener('click', async function () {
        const inputText = input.value.trim();
        if (!inputText) {
            output.innerText = "Lỗi nhập liệu: Vui lòng nhập dữ liệu đầu vào.";
            return;
        }

        output.innerText = "Đang xử lý...";

        try {
            const response = await callGeminiAPI(inputText, apiKey, model);
            output.innerText = response;
        } catch (error) {
            console.error('Lỗi:', error);
            output.innerText = "Lỗi: Không thể kết nối với máy chủ. Vui lòng thử lại sau.";
        }
    });

    async function callGeminiAPI(inputText, apiKey, model) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const requestBody = {
            contents: [{ parts: [{ text: inputText }] }]
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            try {
                const errorJSON = JSON.parse(errorText);
                return `Lỗi máy chủ: ${errorJSON.error.message}`;
            } catch (parseError) {
                return "Lỗi: Định dạng phản hồi không hợp lệ.";
            }
        }

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            return "Không nhận được kết quả phù hợp.";
        }
    }
});

// Đoạn code này chỉ mang tính chất minh họa, bạn cần điều chỉnh cho phù hợp với ứng dụng của mình.

// Khởi tạo API client cho Gemini
const gemini = new GeminiAPIClient({ apiKey: 'YOUR_API_KEY' });

// Hàm tìm kiếm sản phẩm bằng hình ảnh
async function searchProductsByImage(image) {
  const results = await gemini.search({
    query: image,
    type: 'image',
  });
  return results;
}

// Hàm gợi ý sản phẩm cho người dùng
async function suggestProducts(userId) {
  const recommendations = await gemini.recommend({
    userId: userId,
  });
  return recommendations;
}