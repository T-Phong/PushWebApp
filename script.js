// Đăng ký Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/PushWebApp/service-worker.js")
        .then(reg => console.log("Service Worker đăng ký thành công!", reg))
        .catch(err => console.log("Service Worker lỗi:", err));
}

// Xử lý nút cài đặt PWA
let deferredPrompt;
const installBtn = document.getElementById("install-btn");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "block"; // Hiển thị nút cài đặt

    installBtn.addEventListener("click", () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
            if (choice.outcome === "accepted") {
                console.log("Người dùng đã cài đặt PWA");
            } else {
                console.log("Người dùng từ chối cài đặt PWA");
            }
            deferredPrompt = null;
        });
    });
});

OneSignal.push(function() {
    OneSignal.isPushNotificationsEnabled(function(isEnabled) {
        if (isEnabled) {
            console.log("🔔 Thông báo đã được bật!");
        } else {
            console.log("🚀 Đăng ký nhận thông báo...");
            OneSignal.showNativePrompt();
        }
    });

    // Lắng nghe sự kiện người dùng đăng ký nhận thông báo
    OneSignal.on('subscriptionChange', function(isSubscribed) {
        console.log("Trạng thái thông báo:", isSubscribed ? "✅ Đã đăng ký" : "❌ Đã tắt");
    });
});
