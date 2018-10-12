importScripts('https://the-tricktionary.com/__/firebase/3.9.0/firebase-app.js');
importScripts(
  'https://the-tricktionary.com/__/firebase/3.9.0/firebase-messaging.js');
importScripts('https://the-tricktionary.com/__/firebase/init.js');

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ',
    payload);
  // Customize notification here
  const notificationTitle = 'New Level Suggested';
  const notificationOptions = {
    body: 'A new Level has been suggested',
    icon: 'https://the-tricktionary.com/static/img/icon.png',
    click_action: 'https://levels.the-tricktionary.com/admin'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
