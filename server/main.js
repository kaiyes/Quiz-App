

  Cloudinary.config({
    cloud_name: 'jahanara',
    api_key: '546448433889532',
    api_secret: 'O2OXTDPOSmJZOZecrPYsxh9KVT0'
  });


    Push.debug = true;

    Push.Configure({
      apn: {
        // certData: Assets.getText('eddieCert.pem'),
        // keyData: Assets.getText('eddieKey.pem'),
        certData: Assets.getText('eddieCertProd.pem'),
        keyData: Assets.getText('eddieKeyProd.pem'),
        passphrase: '84pk8uu3',
        production: true ,
        // gateway: 'gateway.sandbox.push.apple.com',
        gateway: 'gateway.push.apple.com',
      },
      gcm: {
         apiKey: 'AIzaSyD6UOxN5sBBJx4rujg-WZdgt1wTAiqfbZc',
       }
    });
