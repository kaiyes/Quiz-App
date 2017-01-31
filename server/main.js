

  Cloudinary.config({
    cloud_name: 'jahanara',
    api_key: '546448433889532',
    api_secret: 'O2OXTDPOSmJZOZecrPYsxh9KVT0'
  });


    Push.debug = true;

    Push.Configure({
      apn: {
        certData: Assets.getText('eddieCert.pem'),
        keyData: Assets.getText('eddieKey.pem'),
        passphrase: '84pk8uu3',
        production: true,
        gateway: 'gateway.push.apple.com',
      },

    });
