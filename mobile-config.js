App.info({
  id: 'com.ivive.eddie',
  name: 'Eddie',
  author: 'Kaiyes Ansary',
  email: 'kaiyes.ansary@gmail.com',
  website: 'https://www.ivivelabs.com/'
});

App.icons({
  //iphone
  'iphone': 'public/icons/res/icons/ios/icon-60.png',
  'iphone_2x': 'public/icons/res/icons/ios/icon-60-2x.png', // 120x120
  "iphone_3x": 'public/icons/res/icons/ios/icon-60-3x.png', // 180x180
  //ipad
  "ipad":  'public/icons/res/icons/ios/icon-76.png',// 76x76
  "ipad_2x": 'public/icons/res/icons/ios/icon-76-2x.png', // 152x152
  'ipad_pro': 'public/icons/res/icons/ios/icon-83.5@2x.png',//167*167
  //ipad settings
  "ios_settings": 'public/icons/res/icons/ios/icon-small.png', // 29x29
  "ios_settings_2x": 'public/icons/res/icons/ios/icon-small-2x.png', // 58x58
  "ios_spotlight": 'public/icons/res/icons/ios/icon-40.png', // 40x40
  "ios_spotlight_2x": 'public/icons/res/icons/ios/icon-40-2x.png', // 80x80
  //android
  "android_mdpi": 'public/icons/res/icons/android/icon-48-mdpi.png',
  "android_hdpi": 'public/icons/res/icons/android/icon-72-hdpi.png',
  "android_xhdpi": 'public/icons/res/icons/android/icon-96-xhdpi.png',
  "android_xxhdpi": 'public/icons/res/icons/android/icon-144-xxhdpi.png',
  "android_xxxhdpi": 'public/icons/res/icons/android/icon-192-xxxhdpi.png'
});

App.launchScreens({
  //iphone
  'iphone_2x': 'public/splash/ios/640×960.png',
  'iphone5': 'public/splash/ios/640×1136.png',
  'iphone6': 'public/splash/ios/750×1334.png',
  'iphone6p_portrait':'public/splash/ios/1242×2208.png' ,
  //android
  'android_ldpi_portrait': 'public/splash/android/200x320.png',
  'android_mdpi_portrait': 'public/splash/android/320x480.png',
  'android_hdpi_portrait': 'public/splash/android/480x800.png',
  'android_xhdpi_portrait': 'public/splash/android/720x1080.png',

});

App.accessRule('http://*');
App.accessRule('https://*');
App.accessRule('*');

App.appendToConfig(`
  <universal-links>
    <host name="http://eddie.meteorapp.com" />
  </universal-links>
`);

App.appendToConfig(`<platform name="ios">
    <config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription">
      <string>YOUR DESCRIPTION (PHOTOS PERMISSION) HERE</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription">
      <string>YOUR DESCRIPTION (CAMERA PERMISSION) HERE</string>
    </config-file>
  </platform>`);

  App.configurePlugin('phonegap-plugin-push', {
    SENDER_ID: 647765285364
  });
