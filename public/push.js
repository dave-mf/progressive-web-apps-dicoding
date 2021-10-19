var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BOMosnRrOkW11yEMQRA9n0qcn25RJWiV82dMUbPG_yroUKGPFCcg7_HxGYT3umL4_NjywSPV5kBUanR4l8XIx94",
   "privateKey": "KCqoHwHal6YxF2eYzSitMBmveIrqZNQCwEM1GMiu-bY"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fJWHvo0PkS0:APA91bGdYs4URziHls5G1dpgySicgfqY0ubI8MToH_CBJ9V2ysQTVkoxTEzlvgsjDLq15KWpXsCxqPYap7DY_7kqxqNC_LUis4lIZmwqE25YatRpANFEl_BbYV7AXqXaDcr2pKhyQSJ0",
   "keys": {
       "p256dh": "BG1NAONnLMsfy150g8KdJtrSNZsiFIfXnvH0vewLYPGjmczOXTa2T65t1POI6up1vrDJbhA5J3lDB17+gnJdfIc=",
       "auth": "sakApSo5vCifF7vDvahmWg=="
   }
};
var payload = 'Push Notifikasi menggunakan payload dan FCM!';
 
var options = {
   gcmAPIKey: '6692947210',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);