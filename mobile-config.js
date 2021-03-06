App.info({
  id: 'com.ivive.eddie',
  name: 'Eddie',
  author: 'Kaiyes Ansary',
  email: 'kaiyes.ansary@gmail.com',
  website: 'https://www.ivivelabs.com/'
});

App.icons({
  //iphone
  'iphone_2x': 'public/icons/res/icons/ios/120.png', // 120x120
  'iphone_3x': 'public/icons/res/icons/ios/180.png', // 180x180
  //ipad
  'ipad':  'public/icons/res/icons/ios/76.png',// 76x76
  'ipad_2x': 'public/icons/res/icons/ios/152.png', // 152x152
  'ipad_pro': 'public/icons/res/icons/ios/167.png',//167*167
  //ipad settings
  'ios_settings': 'public/icons/res/icons/ios/29.png', // 29x29
  'ios_settings_2x': 'public/icons/res/icons/ios/58.png', // 58x58
  'ios_spotlight': 'public/icons/res/icons/ios/40.png', // 40x40
  'ios_spotlight_2x': 'public/icons/res/icons/ios/80.png', // 80x80
  //android
  'android_mdpi': 'public/icons/res/icons/android/iconmdpi.png',
  'android_hdpi': 'public/icons/res/icons/android/iconhdpi.png',
  'android_xhdpi': 'public/icons/res/icons/android/iconxhdpi.png',
  // 'android_xxhdpi': 'public/icons/res/icons/android/iconxxhdpi.png',
  // 'android_xxxhdpi': 'public/icons/res/icons/android/iconxxxhdpi.png'
});

App.launchScreens({
  //iphone
  'iphone_2x': 'public/splash/ios/640×960.png',
  'iphone5': 'public/splash/ios/640×1136.png',
  'iphone6': 'public/splash/ios/750×1334.png',
  'iphone6p_portrait':'public/splash/ios/1242×2208.png',
  //android
  'android_mdpi_portrait': 'public/splash/android/mdpi.png',
  'android_hdpi_portrait': 'public/splash/android/hdpi.png',
  'android_xhdpi_portrait': 'public/splash/android/xhdpi.png',
  // 'android_xxhdpi_portrait': 'public/splash/android/xxhdpi.png',
  // 'android_xxxhdpi_portrait': 'public/splash/android/xxxhdpi.png',

});


// App.accessRule('http://*');
// App.accessRule('https://*');
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
