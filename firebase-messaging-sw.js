importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js");

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Nhận thông báo khi web chạy nền
messaging.onBackgroundMessage((payload) => {
    console.log("Nhận thông báo nền:", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/icon.png"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
