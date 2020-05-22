var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BJeK5xl71uqqP1udaoTPh-QKywjZ6wMfL46yX3bZ3y_NfT1uPbWj_CWmXrS-FStYD3PjxRIMarqdIZrjCb1NpxQ",
    "privateKey": "qudaXzptkoyDrHj6zkQExKR-qOEoZleMgSLVoKWIHYA"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e9sZDmsApR0:APA91bHZxrvVbiD3h_ikO8YHm6RA8srJnUGTaGLnH9pZL9OaVODqB7F7H8_LgEItxcO_-zaWSUUBXVvGsHzckiqopCzN2srf0ieiIWzBUllyfPgTRogIXsxPMDfHYAH87Wpg2g53JIH1",
    "keys": {
        "p256dh": "BG7hHnyFSX4P1SU6s5PionF6c86ekOsnnPahITXFi7xHHv0k80IZiub4oLmNjr4LPkrZRdvrIgbDTEWRDW15EXY=",
        "auth": "p7DjbubNzSJhxrPybrUFXQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '759401814165',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);