

  Cloudinary.config({
    cloud_name: 'jahanara',
    api_key: '546448433889532',
    api_secret: 'O2OXTDPOSmJZOZecrPYsxh9KVT0'
  });


    Push.debug = true;

    Push.Configure({
      apn: {
        certData: Assets.getText('eddie-prod-cert.pem'),
        keyData: Assets.getText('eddie-prod-key.pem'),
        passphrase: '84pk8uu3',
        production: true,
        gateway: 'gateway.push.apple.com',
      },

    });
