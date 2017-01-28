App.info({
  id: 'com.ivive.eddie',
  name: 'Eddie',
  author: 'Kaiyes Ansary',
  email: 'kaiyes.ansary@gmail.com',
  website: 'https://www.ivivelabs.com/'
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
    //SENDER_ID: 12341234
  });
