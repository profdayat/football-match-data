document.addEventListener("DOMContentLoaded", function () {
  // Periksa service worker
  if (!("serviceWorker" in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
  } else {
    registerServiceWorker();
  }

  // Register service worker
  function registerServiceWorker() {
    return navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (reg) {
        var serviceWorker;
        if (reg.installing) {
          serviceWorker = reg.installing;
          console.log('Service worker installing');
        } else if (reg.waiting) {
          serviceWorker = reg.waiting;
          console.log('Service worker installed & waiting');
        } else if (reg.active) {
          serviceWorker = reg.active;
          console.log('Service worker active');
        }
        //console.log("Registrasi service worker berhasil.");
        if (serviceWorker) {
          console.log("sw current state", serviceWorker.state);
          if (serviceWorker.state == "activated") {
            //If push subscription wasnt done yet have to do here
            console.log("sw already activated - Do watever needed here");
            if (window.location.pathname.slice(1, 11) != "detailclub") getMatchFinished();
            //getMatchFinished();
          }
          serviceWorker.addEventListener("statechange", function (e) {
            console.log("sw statechange : ", e.target.state);
            if (e.target.state == "activated") {
              if (window.location.pathname.slice(1, 11) != "detailclub") getMatchFinished();
              // use pushManger for subscribing here.
              console.log("Just now activated. now we can subscribe for push notification")
              // subscribeForPushNotification(reg);
              requestPermission();
            }
          });
        }

        //return registration;
      })
      .catch(function (err) {
        console.error("Registrasi service worker gagal.", err);
      });
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function requestPermission() {
    if ("Notification" in window) {
      Notification.requestPermission().then(function (result) {
        if (result === "denied") {
          console.log("Fitur notifikasi tidak diijinkan.");
          return;
        } else if (result === "default") {
          console.error("Pengguna menutup kotak dialog permintaan ijin.");
          return;
        }

        if ("PushManager" in window) {
          navigator.serviceWorker
            .getRegistration()
            .then(function (registration) {
              registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(
                    "BJeK5xl71uqqP1udaoTPh-QKywjZ6wMfL46yX3bZ3y_NfT1uPbWj_CWmXrS-FStYD3PjxRIMarqdIZrjCb1NpxQ"
                  )
                })
                .then(function (subscribe) {
                  console.log(
                    "Berhasil melakukan subscribe dengan endpoint: ",
                    subscribe.endpoint
                  );
                  console.log(
                    "Berhasil melakukan subscribe dengan p256dh key: ",
                    btoa(
                      String.fromCharCode.apply(
                        null,
                        new Uint8Array(subscribe.getKey("p256dh"))
                      )
                    )
                  );
                  console.log(
                    "Berhasil melakukan subscribe dengan auth key: ",
                    btoa(
                      String.fromCharCode.apply(
                        null,
                        new Uint8Array(subscribe.getKey("auth"))
                      )
                    )
                  );
                })
                .catch(function (e) {
                  console.error("Tidak dapat melakukan subscribe ", e.message);
                });
            });
        }
      });
    }
  }
});
