import firebase from 'firebase/compat/app'
// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDZ-8HmKPGucUX6pOkGNc3HP5-Z0sCkQIo",
    authDomain: "testpush-327a6.firebaseapp.com",
    projectId: "testpush-327a6",
    storageBucket: "testpush-327a6.firebasestorage.app",
    messagingSenderId: "928497477879",
    appId: "1:928497477879:web:fa275620d257bc1c35cbf2",
    measurementId: "G-FL7JNMZY7K"
};

// Khởi tạo Firebase
const app  = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Đăng ký Service Worker
navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
        messaging.useServiceWorker(registration);
        console.log("Service Worker Registered!");
    });

$('#test_regis_noti').click(function (e) {
    try {
        const token = messaging.getToken({ vapidKey: "BH83SAbDYe0Y4OtDBt0Z6Y46auqMXjvIXoYyPQZbYQsUQuD9rmr0lbuSwdLbE7z4QVq6R2N4WXkJFTSBzvhgNg0" });
        $("#status").val('ok - ' + token);
        // if (permission === "granted") {

        //     console.log("FCM Token:", token);

        //     // Gửi Token lên backend .NET
        //     await fetch("https://aistaff.aireal.vn/api/save-token/", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ token }),
        //     });

        // } else {
        //     $("#status").val('reject');
        // }
    } catch (error) {
        $("#status").val('error');
    }

});
// Yêu cầu quyền nhận thông báo
async function requestPermission() {

}

// Khi nhận được thông báo từ Firebase
messaging.onMessage((payload) => {
    document.getElementById('status').val(payload);
    console.log("Nhận thông báo:", payload);
    const { title, body } = payload.notification;

    // Hiển thị thông báo push
    new Notification(title, { body });
});