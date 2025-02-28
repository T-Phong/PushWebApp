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
